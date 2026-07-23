using FinancialTracker.Api.Data;
using FinancialTracker.Api.DTOs.Categories;
using FinancialTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialTracker.Api.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly FinancialTrackerDbContext _context;

        public CategoryService(FinancialTrackerDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get every category from the database, convert each one into a DTO, and return them all as a list.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            return await _context.Categories
                .Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Type = category.Type,
                    Description = category.Description,
                    CreatedAt = category.CreatedAt,
                    UpdatedAt = category.UpdatedAt
                })
                .ToListAsync();
        }

        /// <summary>
        /// Find the category with this id, convert it into a DTO, and return it. If it doesn't exist, return nothing.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<CategoryDto?> GetByIdAsync(Guid id)
        {
            return await _context.Categories
                .Where(category => category.Id == id)
                .Select(category => new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Type = category.Type,
                    Description = category.Description,
                    CreatedAt = category.CreatedAt,
                    UpdatedAt = category.UpdatedAt
                })
                .FirstOrDefaultAsync();

        }

        /// <summary>
        /// Take the new category data, create a database record, save it, and give back the created category
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<CategoryDto> CreateAsync(CreateCategoryRequest request)
        {
            if (await _context.Categories.AnyAsync(category => category.Name == request.Name))
            {
                throw new InvalidOperationException("Category name already exists");
            }

            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Type = request.Type,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
                Description = category.Description,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt
            };
        }

        /// <summary>
        /// If the category exists, delete it and tell me it worked. If it doesn't exist, tell me it failed.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteAsync(Guid id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(category => category.Id == id);

            if (category is null)
            {
                return false;
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Find the category, replace its values with the new ones, save it, and return the updated result
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<CategoryDto?> UpdateAsync(Guid id, UpdateCategoryRequest request)
        {
            if (await _context.Categories.AnyAsync(category => category.Name == request.Name && category.Id != id))
            {
                throw new InvalidOperationException("Category name already exists");
            }

            var category = await _context.Categories.FirstOrDefaultAsync(category => category.Id == id);

            if (category is null)
            {
                return null;
            }

            category.Name = request.Name;
            category.Type = request.Type;
            category.Description = request.Description;
            category.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Type = category.Type,
                Description = category.Description,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt
            };
        }
    }
}
