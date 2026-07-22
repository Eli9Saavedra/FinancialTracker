namespace FinancialTracker.Api.Models
{
    public class Income
    {
        public Guid Id { get; set; }
        public required string Source { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateReceived { get; set; }
        public Guid? CategoryId { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
