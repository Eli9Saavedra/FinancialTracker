using FinancialTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialTracker.Api.Data
{
    public class FinancialTrackerDbContext : DbContext
    {
        public FinancialTrackerDbContext(DbContextOptions<FinancialTrackerDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Budget> Budgets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Categories");
                entity.Property(e => e.Name).IsRequired();
                entity.HasIndex(e => e.Name).IsUnique();
                entity.Property(e => e.Type).IsRequired();
            });

            modelBuilder.Entity<Income>(entity =>
            {
                entity.ToTable("Incomes");
                entity.Property(e => e.Source).IsRequired();
                entity.Property(e => e.Amount).IsRequired();
                entity.Property(e => e.DateReceived).IsRequired();
                entity.HasOne<Category>()
                .WithMany()
                .HasForeignKey(e => e.CategoryId)
                .IsRequired(false);
                entity.HasIndex(e => e.DateReceived);
            });

            modelBuilder.Entity<Expense>(entity =>
            {
                entity.ToTable("Expenses");
                entity.Property(e => e.Merchant).IsRequired();
                entity.Property(e => e.Amount).IsRequired();
                entity.Property(e => e.DateSpent).IsRequired();
                entity.HasOne<Category>()
                .WithMany()
                .HasForeignKey(e => e.CategoryId)
                .IsRequired(false);
                entity.HasIndex(e => e.DateSpent);
            });

            modelBuilder.Entity<Budget>(entity =>
            {
                entity.ToTable("Budgets");
                entity.Property(e => e.CategoryId).IsRequired();
                entity.HasOne<Category>()
                .WithMany()
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();
                entity.Property(e => e.Amount).IsRequired();
                entity.Property(e => e.Month).IsRequired();
                entity.Property(e => e.Year).IsRequired();
                entity.HasIndex(e => new { e.CategoryId, e.Month, e.Year }).IsUnique();
                entity.HasIndex(e => e.CategoryId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
