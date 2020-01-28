using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Interfaces.Services
{
    public interface IDrzavaService
    {
        Task<ICollection<Drzava>> DohvatiDrzave();
        Task<Drzava> DohvatiDrzavu(int id);
        Task<Drzava> ZapisiDrzavu(Drzava drzava);
        Task<Drzava> IzmijeniDrzavu(Drzava drzava);
        Task<Drzava> IzbrisiDrzavu(int id);
    }
}
