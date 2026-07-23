namespace FinancialTracker.Api.DTOs.Incomes
{
    public class CreateIncomeRequest
    {
        public required string Source { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateReceived { get; set; }
        public Guid? CategoryId { get; set; }
        public string? Notes { get; set; }
    }
}
