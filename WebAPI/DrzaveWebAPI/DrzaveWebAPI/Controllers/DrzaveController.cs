using Microsoft.AspNetCore.Mvc;
using BusinessLogic.Interfaces.Services;
using BusinessLogic.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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

        // GET: api/drzave
        [HttpGet]
        public async Task<ActionResult> DohvatiDrzavu()
        {
            ICollection<Drzava> listaDrzava = await _drzavaService.DohvatiDrzave();

            if (!listaDrzava.Any())
            {
                return NotFound();
            }

            return Ok(listaDrzava);
        }

        // GET: api/drzave/5
        [HttpGet("{id}")]
        public async Task<ActionResult> DohvatiDrzavu(int id)
        {
            Drzava drzava = await _drzavaService.DohvatiDrzavu(id);

            if (drzava == null)
            {
                return NotFound();
            }

            return Ok(drzava);
        }

        // POST: api/drzave
        [HttpPost]
        public async Task<ActionResult> ZapisiDrzavu(Drzava drzava)
        {
            await _drzavaService.ZapisiDrzavu(drzava);

            return CreatedAtAction("DohvatiDrzavu", new { id = drzava.Id }, drzava);
        }

        // PUT: api/drzave/5
        [HttpPut("{id}")]
        public async Task<ActionResult> IzmijeniDrzavu(int id, Drzava drzava)
        {
            if (id != drzava.Id)
            {
                return BadRequest();
            }

            Drzava spremljenaNovaDrzava = await _drzavaService.IzmijeniDrzavu(drzava);

            if (spremljenaNovaDrzava == drzava)
            {
                return CreatedAtAction("DohvatiDrzavu", new { id = drzava.Id }, spremljenaNovaDrzava);
            }
            else if (spremljenaNovaDrzava == null)
            {
                return NoContent();
            }
            return BadRequest();
        }

        // DELETE: api/drzave/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Drzava>> ObrisiDrzavu(int id)
        {
            Drzava obrisanaDrzava = await _drzavaService.ObrisiDrzavu(id);
            if (obrisanaDrzava == null)
            {
                return NotFound();
            }

            return obrisanaDrzava;
        }

    }
}
