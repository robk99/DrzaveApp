using BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess
{
    public class DrzavedbContext : DbContext
    {
        public DrzavedbContext(DbContextOptions<DrzavedbContext> options)
            :base(options)
        {
            
        }

        public DbSet<Drzava> Drzave { get; set; }
        public DbSet<Grad> Gradovi { get; set; }
    }
}
