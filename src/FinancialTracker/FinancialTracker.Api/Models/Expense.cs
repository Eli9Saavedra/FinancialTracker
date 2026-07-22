namespace FinancialTracker.Api.Models
{
    public class Expense
    {
        public Guid Id { get; set; }
        public required string Merchant { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateSpent { get; set; }
        public Guid? CategoryId { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
