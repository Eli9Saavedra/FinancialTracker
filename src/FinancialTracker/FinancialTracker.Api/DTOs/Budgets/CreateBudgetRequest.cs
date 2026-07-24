using System.ComponentModel.DataAnnotations;

namespace FinancialTracker.Api.DTOs.Budgets
{
    public class CreateBudgetRequest
    {
        [Required]
        [Range(typeof(Guid), "00000000-0000-0000-0000-000000000001", "ffffffff-ffff-ffff-ffff-ffffffffffff", ErrorMessage = "CategoryId is required.")]
        public Guid CategoryId { get; set; }

        [Range(typeof(decimal), "0.01", "79228162514264337593543950335", ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }

        [Range(1, 12, ErrorMessage = "Month must be between 1 and 12.")]
        public int Month { get; set; }

        [Range(1900, 2100, ErrorMessage = "Year must be between 1900 and 2100.")]
        public int Year { get; set; }

        public string? Notes { get; set; }
    }
}
