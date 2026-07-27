using FinancialTracker.Api.Data;
using FinancialTracker.Api.Services.Budgets;
using FinancialTracker.Api.Services.Categories;
using FinancialTracker.Api.Services.Expenses;
using FinancialTracker.Api.Services.Incomes;
using FinancialTracker.Api.Services.Summaries;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IIncomeService, IncomeService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IBudgetService, BudgetService>();
builder.Services.AddScoped<ISummaryService, SummaryService>();

builder.Services.AddDbContextFactory<FinancialTrackerDbContext>(
    opt => opt.UseSqlServer(
        builder.Configuration.GetConnectionString("FinancialTrackerDb")));

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
