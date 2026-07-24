using FinancialTracker.Api.DTOs.Expenses;
using FinancialTracker.Api.DTOs.Incomes;
using FinancialTracker.Api.Services.Expenses;
using Microsoft.AspNetCore.Mvc;

namespace FinancialTracker.Api.Controllers
{
    [ApiController]
    [Route("api/expenses")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpensesController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        /// <summary>
        /// When someone asks for all expenses, get them from the service and return them successfully
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetAll()
        {
            var expenses = await _expenseService.GetAllAsync();
            return Ok(expenses);
        }

        /// <summary>
        /// Find the expense with this id and send it back if it exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetById(Guid id)
        {
            var expense = await _expenseService.GetByIdAsync(id);

            if (expense is null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        /// <summary>
        /// Take the new expense data, save it through the service, and return the created expense
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> Create(CreateExpenseRequest request)
        {
            try
            {
                var createdExpense = await _expenseService.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = createdExpense.Id }, createdExpense);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Find this expense by id, update it with the new data, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ExpenseDto>> Update(Guid id, UpdateExpenseRequest request)
        {
            try
            {
                var updatedExpense = await _expenseService.UpdateAsync(id, request);

                if (updatedExpense is null)
                {
                    return NotFound();
                }

                return Ok(updatedExpense);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Try to delete the expense with this Id. If it exists, delete it and return success. If not, return not found
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var isDeleted = await _expenseService.DeleteAsync(id);

            if (isDeleted is false)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
