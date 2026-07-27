using FinancialTracker.Api.DTOs.Summaries;

namespace FinancialTracker.Api.Services.Summaries
{
    public interface ISummaryService
    {
        Task<MonthlySummaryDto> GetMonthlySummaryAsync(int month, int year);
        Task<IEnumerable<CategorySpendingDto>> GetCategorySpendingAsync(int month, int year);
        Task<IEnumerable<BudgetVsActualDto>> GetBudgetVsActualsAsync(int month, int year);

    }
}
