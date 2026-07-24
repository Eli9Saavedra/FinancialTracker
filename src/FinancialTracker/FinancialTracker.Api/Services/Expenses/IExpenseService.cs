using FinancialTracker.Api.DTOs.Expenses;

namespace FinancialTracker.Api.Services.Expenses
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseDto>> GetAllAsync();
        Task<ExpenseDto?> GetByIdAsync(Guid id);
        Task<ExpenseDto> CreateAsync(CreateExpenseRequest request);
        Task<ExpenseDto> UpdateAsync(Guid id, UpdateExpenseRequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
