using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces.Services
{
    public interface ICountryService
    {
        Task<ICollection<Country>> GetCountries();
        Task<Country> GetCountry(int id);
        Task<Country> PostCountry(Country drzava);
        Task<Country> PutCountry(Country drzava);
        Task<Country> DeleteCountry(int id);
    }
}
