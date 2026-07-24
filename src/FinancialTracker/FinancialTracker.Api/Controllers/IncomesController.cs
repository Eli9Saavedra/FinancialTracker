using FinancialTracker.Api.DTOs.Incomes;
using FinancialTracker.Api.Services.Incomes;
using Microsoft.AspNetCore.Mvc;

namespace FinancialTracker.Api.Controllers
{
    [ApiController]
    [Route("api/incomes")]
    public class IncomesController : ControllerBase
    {
        private readonly IIncomeService _incomeService;

        public IncomesController(IIncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        /// <summary>
        /// When someone asks for all incomes, get them from the service and return them successfully
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IncomeDto>>> GetAll()
        {
            var incomes = await _incomeService.GetAllAsync();
            return Ok(incomes);
        }

        /// <summary>
        /// Find the income with this id and send it back if it exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<IncomeDto>> GetById(Guid id)
        {
            var income = await _incomeService.GetByIdAsync(id);

            if (income is null)
            {
                return NotFound();
            }

            return Ok(income);
        }

        /// <summary>
        /// Take the new income data, save it through the service, and return the created income
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<IncomeDto>> Create(CreateIncomeRequest request)
        {
            try
            {
                var createdIncome = await _incomeService.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = createdIncome.Id }, createdIncome);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Find this income by id, update it with the new data, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<IncomeDto>> Update(Guid id, UpdateIncomeRequest request)
        {
            try
            {
                var updatedIncome = await _incomeService.UpdateAsync(id, request);

                if (updatedIncome is null)
                {
                    return NotFound();
                }

                return Ok(updatedIncome);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Try to delete the income with this id. If it exists, delete it and return success. If not, return not found
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var isDeleted = await _incomeService.DeleteAsync(id);

            if (isDeleted is false)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
