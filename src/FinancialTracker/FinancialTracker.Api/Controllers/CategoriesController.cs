using FinancialTracker.Api.DTOs.Categories;
using FinancialTracker.Api.Services.Categories;
using Microsoft.AspNetCore.Mvc;

namespace FinancialTracker.Api.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// When someone asks for all categories, get them from the service and return them successfully
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }

        /// <summary>
        /// Find the category with this id and send it back if it exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetById(Guid id)
        {
            var category = await _categoryService.GetByIdAsync(id);

            if (category is null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        /// <summary>
        /// Take the new category data, save it through the service, and return the created category
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Create(CreateCategoryRequest request)
        {
            var createdCategory = await _categoryService.CreateAsync(request);

            return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, createdCategory);
        }

        /// <summary>
        /// Find this category by id, update it with the new data, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> Update(Guid id, UpdateCategoryRequest request)
        {
            var updatedCategory = await _categoryService.UpdateAsync(id, request); 

            if (updatedCategory is null)
            {
                return NotFound();
            }

            return Ok(updatedCategory);
        }

        /// <summary>
        /// Try to delete the category with this id. If it exists, delete it and return success. If not, return not found
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var isDeleted = await _categoryService.DeleteAsync(id);

            if (isDeleted is false)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

