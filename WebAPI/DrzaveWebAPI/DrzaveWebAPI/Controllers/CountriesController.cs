using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using BLL.Interfaces.Services;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : Controller
    {
        private readonly ICountryService _countryService;
        private IConfiguration _configuration;
        private string _countriesUrl;

        public CountriesController(ICountryService countryService, IConfiguration config)
        {
            _countryService = countryService;
            _configuration = config;
            _countriesUrl = _configuration.GetSection("CountriesUrl").Value;
        }

        // GET: api/countries
        [HttpGet, Authorize]
        public async Task<ActionResult> GetCountries()
        {
            //throw new Exception();
            ICollection<Country> listOfCountries = await _countryService.GetCountries();

            if (!listOfCountries.Any())
            {
                return NotFound();
            }

            return Ok(listOfCountries);
        }

        // GET: api/countries/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult> GetCountry(int id)
        {
            Country country = await _countryService.GetCountry(id);

            if (country == null)
            {
                return NotFound();
            }

            return Ok(country);
        }

        // POST: api/countries
        [HttpPost, Authorize]
        public async Task<ActionResult> PostCountry([FromBody] Country country)
        {
            await _countryService.PostCountry(country);

            return Created(_countriesUrl, country);
        }

        // PUT: api/countries/5
        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult> PutCountry([FromRoute] int id, [FromBody] Country country)
        {
            if (id != country.Id)
            {
                return BadRequest();
            }

            Country savedNewCountry = await _countryService.PutCountry(country);

            if (savedNewCountry == country)
            {
                return Created(_countriesUrl, savedNewCountry);
            }
            else if (savedNewCountry == null)
            {
                return NotFound();
            }
            return BadRequest();
        }

        // DELETE: api/countries/5
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<Country>> DeleteCountry(int id)
        {
            Country deletedCountry = await _countryService.DeleteCountry(id);
            if (deletedCountry == null)
            {
                return NotFound();
            }

            return Accepted(deletedCountry);
        }

    }
}
