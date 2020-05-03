using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using BLL.Interfaces.Services;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System;
using AutoMapper;
using Entities.DTOs;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : Controller
    {
        private readonly ICountryService _countryService;
        private IConfiguration _configuration;
        private string _countriesUrl;
        private IMapper _mapper;

        public CountriesController(ICountryService countryService, IConfiguration config, IMapper mapper)
        {
            _countryService = countryService;
            _configuration = config;
            _countriesUrl = _configuration.GetSection("CountriesUrl").Value;
            _mapper = mapper;
        }

        // GET: api/countries
        [HttpGet]
        public async Task<ActionResult> GetCountries()
        {
            //throw new Exception();
            ICollection<Country> listOfCountries = await _countryService.GetCountries();

            if (!listOfCountries.Any())
            {
                return NotFound();
            }

            ICollection<CountryDto> listOfCountriesDto = _mapper.Map<ICollection<CountryDto>>(listOfCountries);

            return Ok(listOfCountriesDto);
        }

        // GET: api/countries/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult> GetCountry([FromRoute] int id)
        {
            Country country = await _countryService.GetCountry(id);

            if (country == null)
            {
                return NotFound();
            }

            CountryDto countryDto = _mapper.Map<CountryDto>(country);

            return Ok(countryDto);
        }

        // POST: api/countries
        [HttpPost, Authorize]
        public async Task<ActionResult> PostCountry([FromBody] CountryDto country)
        {
            if (country == null)
            {
                return BadRequest("Country object is null");
            }

            Country countryEntity = _mapper.Map<Country>(country);
            await _countryService.PostCountry(countryEntity);

            country = _mapper.Map<CountryDto>(countryEntity);

            return Created(_countriesUrl, country);
        }

        // PUT: api/countries/5
        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult> PutCountry([FromRoute] int id, [FromBody] CountryDto country)
        {
            if (id != country.Id)
            {
                return BadRequest();
            }

            Country countryEntity = _mapper.Map<Country>(country);
            Country savedNewCountry = await _countryService.PutCountry(countryEntity);

            if (savedNewCountry == countryEntity)
            {
                return Created(_countriesUrl, country);
            }
            else if (savedNewCountry == null)
            {
                return NotFound();
            }
            return BadRequest();
        }

        // DELETE: api/countries/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<CountryDto>> DeleteCountry([FromRoute] int id)
        {
            Country deletedCountry = await _countryService.DeleteCountry(id);
            if (deletedCountry == null)
            {
                return NotFound();
            }

            CountryDto country = _mapper.Map<CountryDto>(deletedCountry);
            return Accepted(country);
        }

    }
}
