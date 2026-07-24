using System.ComponentModel.DataAnnotations;

namespace FinancialTracker.Api.DTOs.Expenses
{
    public class UpdateExpenseRequest
    {
        [Required]
        [RegularExpression(@".*\S.*", ErrorMessage = "Merchant cannot be blank or whitespace")]
        public required string Merchant { get; set; }

        [Range(typeof(decimal), "0.01", "79228162514264337593543950335", ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime DateSpent { get; set; }

        public Guid? CategoryId { get; set; }
        public string? Notes { get; set; }
    }
}
