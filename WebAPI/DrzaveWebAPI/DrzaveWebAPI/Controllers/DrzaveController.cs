using Microsoft.AspNetCore.Mvc;
using BusinessLogic.Interfaces.Services;
using BusinessLogic.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrzaveController : Controller
    {
        private readonly IDrzavaService _drzavaService;

        public DrzaveController(IDrzavaService drzavaService)
        {
            _drzavaService = drzavaService;
        }

        // GET: api/Drzave
        [HttpGet]
        public async Task<ActionResult> DohvatiDrzavu()
        {
            var listaDrzava = await _drzavaService.DohvatiDrzave();
            
            return Ok(listaDrzava);
        }

       

    }
}
