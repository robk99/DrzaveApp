using DAL.Models;
using Microsoft.EntityFrameworkCore;
using DAL.Helpers;

namespace DAL
{
    public class CountriesdbContext : DbContext
    {
        public CountriesdbContext()
        {
        }
        public CountriesdbContext(DbContextOptions<CountriesdbContext> options)
            : base(options)
        {

        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<LoginUser> LoginUsers { get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<City>()
                .HasOne<Country>(g => g.Country)
                .WithMany(d => d.Cities)
                .OnDelete(DeleteBehavior.Cascade);


            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.GetTableName().ToSnakeCase());

                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(property.GetColumnName().ToSnakeCase());
                }

                foreach (var key in entity.GetKeys())
                {
                    key.SetName(key.GetName().ToSnakeCase());
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    key.SetConstraintName(key.GetConstraintName().ToSnakeCase());
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.SetName(index.GetName().ToSnakeCase());
                }
            }
        }
    }
}
