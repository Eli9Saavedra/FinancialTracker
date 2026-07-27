namespace FinancialTracker.Api.DTOs.Summaries
{
    public class MonthlySummaryDto
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalBudget { get; set; }
        public decimal RemainingBudget { get; set; }
        public decimal NetBalance { get; set; }
    }
}
