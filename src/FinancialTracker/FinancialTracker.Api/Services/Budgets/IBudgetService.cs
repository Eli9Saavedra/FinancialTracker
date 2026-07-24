using FinancialTracker.Api.DTOs.Budgets;

namespace FinancialTracker.Api.Services.Budgets
{
    public interface IBudgetService
    {
        Task<IEnumerable<BudgetDto>> GetAllAsync();
        Task<BudgetDto?> GetByIdAsync(Guid id);
        Task<BudgetDto> CreateAsync(CreateBudgetRequest request);
        Task<BudgetDto?> UpdateAsync(Guid id, UpdateBudgetRequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
