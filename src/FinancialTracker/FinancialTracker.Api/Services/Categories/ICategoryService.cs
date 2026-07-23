using FinancialTracker.Api.DTOs.Categories;

namespace FinancialTracker.Api.Services.Categories
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(Guid id);
        Task<CategoryDto> CreateAsync(CreateCategoryRequest request);
        Task<CategoryDto> UpdateAsync(Guid id, UpdateCategoryRequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
