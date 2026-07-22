using FinancialTracker.Api.Enums;

namespace FinancialTracker.Api.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public CategoryType Type { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
