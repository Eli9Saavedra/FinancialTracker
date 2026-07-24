using FinancialTracker.Api.Data;
using FinancialTracker.Api.DTOs.Budgets;
using FinancialTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialTracker.Api.Services.Budgets
{
    public class BudgetService : IBudgetService
    {
        private readonly FinancialTrackerDbContext _context;

        public BudgetService(FinancialTrackerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get every budget from the database, convert each one into a DTO, and return them all as a list
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<BudgetDto>> GetAllAsync()
        {
            return await _context.Budgets
                .Select(budget => new BudgetDto
                {
                    Id = budget.Id,
                    CategoryId = budget.CategoryId,
                    Amount = budget.Amount,
                    Month = budget.Month,
                    Year = budget.Year,
                    Notes = budget.Notes,
                    CreatedAt = budget.CreatedAt,
                    UpdatedAt = budget.UpdatedAt
                })
                .ToListAsync();
        }

        /// <summary>
        /// Find the budget with this id, convert it into a DTO, and return it. If it doesn't exist, return nothing
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<BudgetDto?> GetByIdAsync(Guid id)
        {
            return await _context.Budgets
                .Where(budget => budget.Id == id)
                .Select(budget => new BudgetDto
                {
                    Id = budget.Id,
                    CategoryId = budget.CategoryId,
                    Amount = budget.Amount,
                    Month = budget.Month,
                    Year = budget.Year,
                    Notes = budget.Notes,
                    CreatedAt = budget.CreatedAt,
                    UpdatedAt = budget.UpdatedAt
                })
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Take the new budget data, create a database record, save it, and give it back the created budget
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<BudgetDto> CreateAsync(CreateBudgetRequest request)
        {
            await ValidateCategoryIdAsync(request.CategoryId);
            ValidateAmount(request.Amount);
            ValidateMonth(request.Month);
            ValidateYear(request.Year);

            var budget = new Budget
            {
                Id = Guid.NewGuid(),
                CategoryId = request.CategoryId,
                Amount = request.Amount,
                Month = request.Month,
                Year = request.Year,
                Notes = request.Notes,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();

            return new BudgetDto
            {
                Id = budget.Id,
                CategoryId = budget.CategoryId,
                Amount = budget.Amount,
                Month = budget.Month,
                Year = budget.Year,
                Notes = budget.Notes,
                CreatedAt = budget.CreatedAt,
                UpdatedAt = budget.UpdatedAt
            };
        }

        /// <summary>
        /// If the budget exists, delete it and tell me it worked. If it doesn't exist, tell me it failed
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteAsync(Guid id)
        {
            var budget = await _context.Budgets.FirstOrDefaultAsync(budget => budget.Id == id);

            if (budget is null)
            {
                return false;
            }

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Find the budget, replace its values with the new ones, save it, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<BudgetDto?> UpdateAsync(Guid id, UpdateBudgetRequest request)
        {
            await ValidateCategoryIdAsync(request.CategoryId);
            ValidateAmount(request.Amount);
            ValidateMonth(request.Month);
            ValidateYear(request.Year);

            var budget = await _context.Budgets.FirstOrDefaultAsync(budget => budget.Id == id);

            if (budget is null)
            {
                return null;
            }

            budget.CategoryId = request.CategoryId;
            budget.Amount = request.Amount;
            budget.Month = request.Month;
            budget.Year = request.Year;
            budget.Notes = request.Notes;
            budget.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new BudgetDto
            {
                Id = budget.Id,
                CategoryId = budget.CategoryId,
                Amount = budget.Amount,
                Month = budget.Month,
                Year = budget.Year,
                Notes = budget.Notes,
                CreatedAt = budget.CreatedAt,
                UpdatedAt = budget.UpdatedAt
            };
        }

        private async Task ValidateCategoryIdAsync(Guid categoryId)
        {
            if (!await _context.Categories.AnyAsync(category => category.Id == categoryId))
            {
                throw new InvalidOperationException("Category does not exist.");
            }
        }

        private static void ValidateAmount(decimal amount)
        {
            if (amount <= 0)
            {
                throw new InvalidOperationException("Amount must be greater than zero.");
            }
        }

        private static void ValidateMonth(int month)
        {
            if (month < 1 || month > 12)
            {
                throw new InvalidOperationException("Month must be between 1 and 12.");
            }
        }

        private static void ValidateYear(int year)
        {
            if (year < 1900 || year > 2100)
            {
                throw new InvalidOperationException("Year must be between 1900 and 2100.");
            }
        }
    }
}
