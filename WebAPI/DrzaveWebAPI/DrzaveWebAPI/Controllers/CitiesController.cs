using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using BLL.Interfaces.Services;
using DAL.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : Controller
    {
        private readonly ICityService _cityService;
        private IConfiguration _configuration;
        private string _citiesUrl;

        public CitiesController(ICityService cityService, IConfiguration config)
        {
            _cityService = cityService;
            _configuration = config;
            _citiesUrl = _configuration.GetSection("CitiesUrl").Value;
        }

        // GET: api/cities
        [HttpGet, Authorize]
        public async Task<ActionResult> GetCities()
        {
            ICollection<City> listOfCities = await _cityService.GetCities();

            if (!listOfCities.Any())
            {
                return NotFound();
            }

            return Ok(listOfCities);
        }

        // GET: api/cities/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult> GetCity(int id)
        {
            City city = await _cityService.GetCity(id);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // GET: api/countries/id/cities
        [HttpGet, Authorize]
        [Route("~/api/countries/{id:int}/cities")]
        public async Task<ActionResult> GetCitiesByCountry(int id)
        {
            ICollection<City> listOfCities = await _cityService.GetCitiesByCountry(id);

            if (!listOfCities.Any())
            {
                return NotFound();
            }

            return Ok(listOfCities);
        }

        // POST: api/cities
        [HttpPost, Authorize]
        public async Task<ActionResult> PostCity(City city)
        {
            await _cityService.PostCity(city);

            return Created(_citiesUrl, city);
        }

        // PUT: api/cities/5
        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult> PutCity(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            City savedNewCity = await _cityService.PutCity(city);

            if (savedNewCity == city)
            {
                return Created(_citiesUrl, savedNewCity);
            }
            else if (savedNewCity == null)
            {
                return NotFound();
            }
            return BadRequest();
        }

        // DELETE: api/cities/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<City>> DeleteCity(int id)
        {
            City deletedCity = await _cityService.DeleteCity(id);
            if (deletedCity == null)
            {
                return NotFound();
            }
            return Accepted(deletedCity);
        }
    }
}
