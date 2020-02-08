using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using BLL.Interfaces.Services;
using DAL;
using DAL.Models;

namespace BLL.Services
{
    public class CountryService : ICountryService
    {
        private readonly CountriesdbContext _context;

        public CountryService(CountriesdbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Country>> GetCountries()
        {
            return await _context.Countries.AsNoTracking().ToListAsync();
        }

        public async Task<Country> GetCountry(int id)
        {
            return await _context.Countries.FindAsync(id);
        }

        public async Task<Country> PostCountry(Country country)
        {
            await _context.Countries.AddAsync(country);
            await _context.SaveChangesAsync();

            return country;
        }

        public async Task<Country> PutCountry(Country country)
        {
            try
            {
                _context.Entry(country).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return country;
            }
            catch
            {
                if (!CountryExists(country.Id))
                {
                    country = null;
                }
                return country;
            }
        }

        public async Task<Country> DeleteCountry(int id)
        {
            Country country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                return country;
            }

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return country;
        }

        private bool CountryExists(int id)
        {
            return _context.Countries.Any(d => d.Id == id);
        }
    }
}
