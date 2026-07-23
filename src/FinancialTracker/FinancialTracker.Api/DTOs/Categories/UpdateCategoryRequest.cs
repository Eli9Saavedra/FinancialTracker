using FinancialTracker.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace FinancialTracker.Api.DTOs.Categories
{
    public class UpdateCategoryRequest
    {
        [Required]
        [RegularExpression(@".*\S.*", ErrorMessage = "Name cannot be blank or whitespace")]
        public required string Name { get; set; }
        public CategoryType Type { get; set; }
        public string? Description { get; set; }
    }
}
