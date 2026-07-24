namespace FinancialTracker.Api.DTOs.Budgets
{
    public class UpdateBudgetRequest
    {
        public Guid CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string? Notes { get; set; }
    }
}
