using FinancialTracker.Api.Data;
using FinancialTracker.Api.DTOs.Expenses;
using FinancialTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialTracker.Api.Services.Expenses
{
    public class ExpenseService : IExpenseService
    {
        private readonly FinancialTrackerDbContext _context;

        public ExpenseService(FinancialTrackerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get every expense from the database, convert each one into a DTO, and return them all as a list
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<ExpenseDto>> GetAllAsync()
        {
            return await _context.Expenses
                .Select(expense => new ExpenseDto
                {
                    Id = expense.Id,
                    Merchant = expense.Merchant,
                    Amount = expense.Amount,
                    DateSpent = expense.DateSpent,
                    CategoryId = expense.CategoryId,
                    Notes = expense.Notes,
                    CreatedAt = expense.CreatedAt,
                    UpdatedAt = expense.UpdatedAt
                })
                .ToListAsync();
        }

        /// <summary>
        /// Find the expense with this id, convert it into a DTO, and return if. If it doesn't exist, return nothing.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ExpenseDto?> GetByIdAsync(Guid id)
        {
            return await _context.Expenses
                .Where(expense => expense.Id == id)
                .Select(expense => new ExpenseDto
                {
                    Id = expense.Id,
                    Merchant = expense.Merchant,
                    Amount = expense.Amount,
                    DateSpent = expense.DateSpent,
                    CategoryId = expense.CategoryId,
                    Notes = expense.Notes,
                    CreatedAt = expense.CreatedAt,
                    UpdatedAt = expense.UpdatedAt
                })
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Take the new expense data, create a database record, save it, and give back the created category
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ExpenseDto> CreateAsync(CreateExpenseRequest request)
        {
            await ValidateCategoryIdAsync(request.CategoryId);

            if (await _context.Expenses.AnyAsync(expense => expense.Merchant == request.Merchant))
            {
                throw new InvalidOperationException("Expense merchant already exists");
            }

            var expense = new Expense
            {
                Id = Guid.NewGuid(),
                Merchant = request.Merchant,
                Amount = request.Amount,
                DateSpent = request.DateSpent,
                CategoryId = request.CategoryId,
                Notes = request.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return new ExpenseDto
            {
                Id = expense.Id,
                Merchant = expense.Merchant,
                Amount = expense.Amount,
                DateSpent = expense.DateSpent,
                CategoryId = expense.CategoryId,
                Notes = expense.Notes,
                CreatedAt = expense.CreatedAt,
                UpdatedAt = expense.UpdatedAt
            };
        }

        /// <summary>
        /// If the expense exists, delete it and tell me it worked. If it doesn't exist, tell me it failed
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteAsync(Guid id)
        {
            var expense = await _context.Expenses.FirstOrDefaultAsync(expense => expense.Id == id);

            if (expense is null)
            {
                return false;
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Find the expense, replace its values with the new ones, save it, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ExpenseDto?> UpdateAsync(Guid id, UpdateExpenseRequest request)
        {
            await ValidateCategoryIdAsync(request.CategoryId);

            if (await _context.Expenses.AnyAsync(expense => expense.Merchant == request.Merchant && expense.Id != id))
            {
                throw new InvalidOperationException("Expense merchant already exists");
            }

            var expense = await _context.Expenses.FirstOrDefaultAsync(expense => expense.Id == id);

            if (expense is null)
            {
                return null;
            }

            expense.Merchant = request.Merchant;
            expense.Amount = request.Amount;
            expense.DateSpent = request.DateSpent;
            expense.Notes = request.Notes;
            expense.CategoryId = request.CategoryId;
            expense.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new ExpenseDto
            {
                Id = expense.Id,
                Merchant = expense.Merchant,
                Amount = expense.Amount,
                DateSpent = expense.DateSpent,
                CategoryId = expense.CategoryId,
                Notes = expense.Notes,
                CreatedAt = expense.CreatedAt,
                UpdatedAt = expense.UpdatedAt
            };
        }

        private async Task ValidateCategoryIdAsync(Guid? categoryId)
        {
            if (categoryId.HasValue &&
                !await _context.Categories.AnyAsync(category => category.Id == categoryId.Value))
            {
                throw new InvalidOperationException("Category does not exist.");
            }
        }
    }
}
