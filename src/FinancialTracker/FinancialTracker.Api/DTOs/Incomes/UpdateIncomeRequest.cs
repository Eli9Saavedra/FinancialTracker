using System.ComponentModel.DataAnnotations;

namespace FinancialTracker.Api.DTOs.Incomes
{
    public class UpdateIncomeRequest
    {
        [Required]
        [RegularExpression(@".*\S.*", ErrorMessage = "Source cannot be blank or whitespace.")]
        public required string Source { get; set; }

        [Range(typeof(decimal), "0.01", "79228162514264337593543950335", ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime DateReceived { get; set; }

        public Guid? CategoryId { get; set; }
        public string? Notes { get; set; }
    }
}
