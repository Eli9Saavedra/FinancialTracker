namespace FinancialTracker.Api.DTOs.Budgets
{
    public class BudgetDto
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
