using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using BLL.Interfaces.Services;
using Entities.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Entities.DTOs;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : Controller
    {
        private readonly ICityService _cityService;
        private readonly IConfiguration _configuration;
        private readonly string _citiesUrl;
        private IMapper _mapper;
        
        public CitiesController(ICityService cityService, IConfiguration config, IMapper mapper)
        {
            _cityService = cityService;
            _configuration = config;
            _citiesUrl = _configuration.GetSection("CitiesUrl").Value;
            _mapper = mapper;
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

            ICollection<CityDto> listOfCitiesDto = _mapper.Map<ICollection<CityDto>>(listOfCities);
            
            return Ok(listOfCitiesDto);
        }

        // GET: api/cities/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult> GetCity([FromRoute] int id)
        {
            City city = await _cityService.GetCity(id);

            if (city == null)
            {
                return NotFound();
            }

            CityDto cityDto = _mapper.Map<CityDto>(city);

            return Ok(cityDto);
        }

        // GET: api/countries/id/cities
        [HttpGet, Authorize]
        [Route("~/api/countries/{id:int}/cities")]
        public async Task<ActionResult> GetCitiesByCountry([FromRoute] int id)
        {
            ICollection<City> listOfCities = await _cityService.GetCitiesByCountry(id);

            if (!listOfCities.Any())
            {
                return NotFound();
            }

            ICollection<CityDto> listOfCitiesDto = _mapper.Map<ICollection<CityDto>>(listOfCities);
            
            return Ok(listOfCitiesDto);
        }

        // POST: api/cities
        [HttpPost, Authorize]
        public async Task<ActionResult> PostCity([FromBody] CityDto city)
        {
            if (city == null)
            {
                return BadRequest("City object is null");
            }

            City cityEntity = _mapper.Map<City>(city);
            await _cityService.PostCity(cityEntity);

            city = _mapper.Map<CityDto>(cityEntity);

            return Created(_citiesUrl, city);
        }

        // PUT: api/cities/5
        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult> PutCity([FromRoute] int id, [FromBody] CityDto city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            City cityEntity = _mapper.Map<City>(city);
            City savedNewCity = await _cityService.PutCity(cityEntity);

            if (savedNewCity == cityEntity)
            {
                return Created(_citiesUrl, city);
            }
            else if (savedNewCity == null)
            {
                return NotFound();
            }
            return BadRequest();
        }

        // DELETE: api/cities/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<CityDto>> DeleteCity([FromRoute] int id)
        {
            City deletedCity = await _cityService.DeleteCity(id);
            if (deletedCity == null)
            {
                return NotFound();
            }

            CityDto city = _mapper.Map<CityDto>(deletedCity);
            return Accepted(city);
        }
    }
}
