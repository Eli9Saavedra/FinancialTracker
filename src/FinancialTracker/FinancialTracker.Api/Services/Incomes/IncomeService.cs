using FinancialTracker.Api.Data;
using FinancialTracker.Api.DTOs.Incomes;
using FinancialTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialTracker.Api.Services.Incomes
{
    public class IncomeService : IIncomeService
    {
        private readonly FinancialTrackerDbContext _context;
        public IncomeService(FinancialTrackerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get evert income from the database, convert each one into a DTO, and return them all as a list
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<IncomeDto>> GetAllAsync()
        {
            return await _context.Incomes
                .Select(income => new IncomeDto
                {
                    Id = income.Id,
                    Source = income.Source,
                    Amount = income.Amount,
                    DateReceived = income.DateReceived,
                    Notes = income.Notes,
                    CategoryId = income.CategoryId,
                    CreatedAt = income.CreatedAt,
                    UpdatedAt = income.UpdatedAt
                })
                .ToListAsync();
        }

        /// <summary>
        /// Find the income with this id, convert it into a DTO, and return it. If it doesn't exist, return nothing
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<IncomeDto?> GetByIdAsync(Guid id)
        {
            return await _context.Incomes
                .Where(income => income.Id == id)
                .Select(income => new IncomeDto
                {
                    Id = income.Id,
                    Source = income.Source,
                    Amount = income.Amount,
                    DateReceived = income.DateReceived,
                    Notes = income.Notes,
                    CategoryId = income.CategoryId,
                    CreatedAt = income.CreatedAt,
                    UpdatedAt = income.UpdatedAt
                })
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Take the new income data, create a database record, save it, and give it back the created income
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<IncomeDto> CreateAsync(CreateIncomeRequest request)
        {
            if (await _context.Incomes.AnyAsync(income => income.Source == request.Source))
            {
                throw new InvalidOperationException("Income source already exists");
            }

            var income = new Income
            {
                Id = Guid.NewGuid(),
                Source = request.Source,
                Amount = request.Amount,
                DateReceived = request.DateReceived,
                Notes = request.Notes,
                CategoryId = request.CategoryId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Incomes.Add(income);
            await _context.SaveChangesAsync();

            return new IncomeDto
            {
                Id = income.Id,
                Source = income.Source,
                Amount = income.Amount,
                DateReceived = income.DateReceived,
                Notes = income.Notes,
                CategoryId = income.CategoryId,
                CreatedAt = income.CreatedAt,
                UpdatedAt = income.UpdatedAt
            };
        }

        /// <summary>
        /// If the income exists, delete it and tell me it worked. If it doesn't exist, tell me it failed
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteAsync(Guid id)
        {
            var income = await _context.Incomes.FirstOrDefaultAsync(income => income.Id == id);

            if (income is null)
            {
                return false;
            }

            _context.Incomes.Remove(income);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IncomeDto?> UpdateAsync(Guid id, UpdateIncomeRequest request)
        {
            if (await _context.Incomes.AnyAsync(income => income.Source == request.Source && income.Id != id))
            {
                throw new InvalidOperationException("Source name already exists");
            }

            var income = await _context.Incomes.FirstOrDefaultAsync(income => income.Id == id);

            if (income is null)
            {
                return null;
            }

            income.Source = request.Source;
            income.Amount = request.Amount;
            income.DateReceived = request.DateReceived;
            income.CategoryId = request.CategoryId;
            income.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new IncomeDto
            {
                Id = income.Id,
                Source = income.Source,
                Amount = income.Amount,
                DateReceived= income.DateReceived,
                Notes = income.Notes,
                CategoryId = income.CategoryId,
                CreatedAt = income.CreatedAt,
                UpdatedAt = income.UpdatedAt
            };
        }
    }
}
