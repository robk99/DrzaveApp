using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces.Services
{
    public interface ICityService
    {
        Task<ICollection<City>> GetCities();
        Task<City> GetCity(int id);
        Task<ICollection<City>> GetCitiesByCountry(int id);
        Task<City> PostCity(City grad);
        Task<City> PutCity(City grad);
        Task<City> DeleteCity(int id);
    }
}
