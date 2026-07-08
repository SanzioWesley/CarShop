using System.Reflection.Emit;
using CarShop.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarShop.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Carro> Carros { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Aqui podemos configurar precisão do preço para o SQL Server não arredondar errado
            modelBuilder.Entity<Carro>()
                .Property(c => c.Preco)
                .HasPrecision(18, 2);
        }
    }
}