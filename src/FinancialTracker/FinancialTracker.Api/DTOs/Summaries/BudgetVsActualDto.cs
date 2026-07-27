namespace FinancialTracker.Api.DTOs.Summaries
{
    public class BudgetVsActualDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal Budgeted { get; set; }
        public decimal Actual { get; set; }
        public decimal Remaining { get; set; }
    }
}
