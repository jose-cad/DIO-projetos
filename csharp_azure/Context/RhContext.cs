using Microsoft.EntityFrameworkCore;
using Rh.Models;

namespace Rh.Context
{
    public class RhContext : DbContext
    {
        public RhContext(DbContextOptions<RhContext> options) : base(options)
        {
        }

        public DbSet<Funcionario> Funcionarios { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Funcionario>()
                .Property(f => f.Salario)
                .HasPrecision(10, 2);
        }
    }
}
