using BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic
{
    public class DrzavedbContext : DbContext
    {
        public DrzavedbContext()
        {
        }
        public DrzavedbContext(DbContextOptions<DrzavedbContext> options)
            :base(options)
        {
            
        }

        public DbSet<Drzava> Drzave { get; set; }
        public DbSet<Grad> Gradovi { get; set; }
    }
}
