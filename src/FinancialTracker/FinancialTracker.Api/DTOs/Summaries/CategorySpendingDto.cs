namespace FinancialTracker.Api.DTOs.Summaries
{
    public class CategorySpendingDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal TotalSpent { get; set; }
    }
}
