using BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using DAL.Helpers;

namespace BusinessLogic
{
    public class DrzavedbContext : DbContext
    {
        public DrzavedbContext()
        {
        }
        public DrzavedbContext(DbContextOptions<DrzavedbContext> options)
            : base(options)
        {

        }

        public DbSet<Drzava> Drzave { get; set; }
        public DbSet<Grad> Gradovi { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Grad>()
                .HasOne<Drzava>(g => g.Drzava)
                .WithMany(d => d.Gradovi)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Drzava>()
                .HasMany<Grad>(d => d.Gradovi)
                .WithOne(g => g.Drzava)
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
