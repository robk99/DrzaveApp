using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces.Services
{
    public interface ICityService
    {
        Task<ICollection<City>> GetCities();
        Task<City> GetCity(int id);
        Task<ICollection<City>> GetCitiesByCountry(int id);
        Task<City> PostCity(City city);
        Task<City> PutCity(City city);
        Task<City> DeleteCity(int id);
    }
}
