using BusinessLogic.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.Services
{
    public interface IDrzavaService
    {
        Task<IEnumerable<Drzava>> DohvatiDrzave();
        Task<Drzava> DohvatiDrzavu(int id);
        Task<Drzava> ZapisiDrzavu(Drzava drzava);
        Task<Drzava> IzmijeniDrzavu(int id, Drzava drzava);
        Task<Drzava> ObrisiDrzavu(int id);
    }
}
