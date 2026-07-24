using FinancialTracker.Api.DTOs.Budgets;
using FinancialTracker.Api.Services.Budgets;
using Microsoft.AspNetCore.Mvc;

namespace FinancialTracker.Api.Controllers
{
    [ApiController]
    [Route("api/budgets")]
    public class BudgetsController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetsController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        /// <summary>
        /// When someone asks for all budgets, get them from the service and return them successfully
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BudgetDto>>> GetAll()
        {
            var budgets = await _budgetService.GetAllAsync();
            return Ok(budgets);
        }

        /// <summary>
        /// Find the budget with this id and send it back if it exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDto>> GetById(Guid id)
        {
            var budget = await _budgetService.GetByIdAsync(id);

            if (budget is null)
            {
                return NotFound();
            }

            return Ok(budget);
        }

        /// <summary>
        /// Take the new budget data, save it through the service, and return the created budget
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<BudgetDto>> Create(CreateBudgetRequest request)
        {
            try
            {
                var createBudget = await _budgetService.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = createBudget.Id }, createBudget);
            }
            catch (InvalidOperationException ex)
            {
                if (ex.Message.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                {
                    return Conflict(ex.Message);
                }

                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Find this budget by id, update it with the new data, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<BudgetDto>> Update(Guid id, UpdateBudgetRequest request)
        {
            try
            {
                var updatedBudget = await _budgetService.UpdateAsync(id, request);

                if (updatedBudget is null)
                {
                    return NotFound();
                }

                return Ok(updatedBudget);
            }
            catch (InvalidOperationException ex)
            {
                if (ex.Message.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                {
                    return Conflict(ex.Message);
                }

                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Try to delete the budget with this Id. If it exists, delete it and return success. If not, return not found
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var isDeleted = await _budgetService.DeleteAsync(id);

            if (isDeleted is false)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
