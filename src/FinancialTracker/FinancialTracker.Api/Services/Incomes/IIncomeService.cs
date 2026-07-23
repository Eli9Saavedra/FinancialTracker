using FinancialTracker.Api.DTOs.Incomes;

namespace FinancialTracker.Api.Services.Incomes
{
    public interface IIncomeService
    {
        Task<IEnumerable<IncomeDto>> GetAllAsync();
        Task<IncomeDto?> GetByIdAsync(Guid id);
        Task<IncomeDto> CreateAsync(CreateIncomeRequest request);
        Task<IncomeDto> UpdateAsync(Guid id, UpdateIncomeRequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
