namespace FinancialTracker.Api.DTOs.Expenses
{
    public class UpdateExpenseRequest
    {
        public required string Merchant { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateSpent { get; set; }
        public Guid? CategoryId { get; set; }
        public string? Notes { get; set; }
    }
}
