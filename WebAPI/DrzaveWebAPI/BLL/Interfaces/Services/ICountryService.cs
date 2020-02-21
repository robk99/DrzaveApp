using ENTITIES.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces.Services
{
    public interface ICountryService
    {
        Task<ICollection<Country>> GetCountries();
        Task<Country> GetCountry(int id);
        Task<Country> PostCountry(Country country);
        Task<Country> PutCountry(Country country);
        Task<Country> DeleteCountry(int id);
    }
}
