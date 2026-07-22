using FinancialTracker.Api.Enums;

namespace FinancialTracker.Api.DTOs.Categories
{
    public class CreateCategoryRequest
    {
        public required string Name { get; set; }
        public CategoryType Type { get; set; }
        public string? Description { get; set; }
    }
}
