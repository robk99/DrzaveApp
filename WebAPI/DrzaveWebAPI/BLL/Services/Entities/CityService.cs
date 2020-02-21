using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BLL.Interfaces.Services;
using DAL;
using Entities.Models;

namespace BLL.Services.Entities
{
    public class CityService : ICityService
    {
        private readonly CountriesdbContext _context;
        public CityService(CountriesdbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<City>> GetCities()
        {
            return await _context.Cities.AsNoTracking().ToListAsync();
        }

        public async Task<City> GetCity(int id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task<ICollection<City>> GetCitiesByCountry(int id)
        {
            ICollection<City> listOfCities = await _context.Cities.AsNoTracking().Where<City>(g => g.CountryId == id).ToListAsync();
            return listOfCities;
        }

        public async Task<City> PostCity(City city)
        {
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();

            return city;
        }

        public async Task<City> PutCity(City city)
        {
            try
            {
                _context.Entry(city).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return city;
            }
            catch
            {
                if (!CityExists(city.Id))
                {
                    city = null;
                }
                return city;
            }
        }

        public async Task<City> DeleteCity(int id)
        {
            City city = await _context.Cities.FindAsync(id);
            if (city == null)
            {
                return city;
            }

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return city;
        }

        private bool CityExists(int id)
        {
            return _context.Cities.Any(g => g.Id == id);
        }

    }
}
