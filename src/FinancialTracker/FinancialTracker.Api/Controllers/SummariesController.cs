using FinancialTracker.Api.DTOs.Summaries;
using FinancialTracker.Api.Services.Summaries;
using Microsoft.AspNetCore.Mvc;

namespace FinancialTracker.Api.Controllers
{
    [ApiController]
    [Route("api/summaries")]
    public class SummariesController : ControllerBase
    {
        private readonly ISummaryService _summaryService;

        public SummariesController(ISummaryService summaryService)
        {
            _summaryService = summaryService;
        }

        [HttpGet("monthly")]
        public async Task<ActionResult<MonthlySummaryDto>> GetMonthlySummaryAsync([FromQuery] int month, [FromQuery] int year)
        {
            if (month < 1 || month > 12 || year < 1)
            {
                return BadRequest();
            }

            var result = await _summaryService.GetMonthlySummaryAsync(month, year);

            return Ok(result);
        }
    }
}
