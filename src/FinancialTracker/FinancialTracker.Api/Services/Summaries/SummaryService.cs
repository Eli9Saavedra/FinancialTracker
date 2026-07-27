using FinancialTracker.Api.Data;
using FinancialTracker.Api.DTOs.Summaries;
using Microsoft.EntityFrameworkCore;

namespace FinancialTracker.Api.Services.Summaries
{
    public class SummaryService : ISummaryService
    {
        private readonly FinancialTrackerDbContext _context;

        public SummaryService(FinancialTrackerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Method to calculate in a given month and year how much money came in, went out, and was budgeted
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public async Task<MonthlySummaryDto> GetMonthlySummaryAsync(int month, int year)
        {
            var totalIncome = await _context.Incomes
                .Where(i => i.DateReceived.Month == month && i.DateReceived.Year == year)
                .SumAsync(i => i.Amount);

            var totalExpenses = await _context.Expenses
                .Where(e => e.DateSpent.Month == month && e.DateSpent.Year == year)
                .SumAsync(e => e.Amount);

            var totalBudget = await _context.Budgets
                .Where(b => b.Month == month && b.Year == year)
                .SumAsync(b => b.Amount);

            return new MonthlySummaryDto
            {
                Month = month,
                Year = year,
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                TotalBudget = totalBudget,
                RemainingBudget = totalBudget - totalExpenses,
                NetBalance = totalIncome - totalExpenses
            };
        }

        /// <summary>
        /// Method to calcualte the total amount spent for each category 
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public async Task<IEnumerable<CategorySpendingDto>> GetCategorySpendingAsync(int month, int year)
        {
            var expenses = await _context.Expenses
                .Where(e => e.DateSpent.Month == month && e.DateSpent.Year == year)
                .Join(_context.Categories,
                        e => e.CategoryId,
                        c => c.Id,
                        (e, c) => new { e, c })
                .GroupBy(x => new { x.c.Id, x.c.Name })
                .Select(g => new CategorySpendingDto
                {
                    CategoryId = g.Key.Id,
                    CategoryName = g.Key.Name,
                    TotalSpent = g.Sum(x => x.e.Amount)
                })
                .ToListAsync();

            return expenses;
                
        }

        /// <summary>
        /// Method to show how much for each cateogory was planned vs how much was spent
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public async Task<IEnumerable<BudgetVsActualDto>> GetBudgetVsActualsAsync(int month, int year)
        {
            var result = await _context.Budgets
                .Where(b => b.Month == month && b.Year == year)
                .Join(_context.Categories,
                    b => b.CategoryId,
                    c => c.Id,
                    (b, c) => new { b, c })
                .Select(x => new BudgetVsActualDto
                {
                    CategoryId = x.b.CategoryId,
                    CategoryName = x.c.Name,
                    Budgeted = x.b.Amount,
                    Actual = _context.Expenses
                        .Where(e => e.CategoryId == x.b.CategoryId
                            && e.DateSpent.Month == month
                            && e.DateSpent.Year == year)
                        .Sum(e => e.Amount),
                    Remaining = x.b.Amount - _context.Expenses
                        .Where(e => e.CategoryId == x.b.CategoryId
                            && e.DateSpent.Month == month
                            && e.DateSpent.Year == year)
                        .Sum(e => e.Amount)
                })
                .ToListAsync();

            return result;
                
        }
    }
}
