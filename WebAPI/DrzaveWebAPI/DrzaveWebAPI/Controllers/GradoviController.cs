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
    public class GradoviController : Controller
    {
        private readonly IGradService _gradService;

        public GradoviController(IGradService gradService)
        {
            _gradService = gradService;
        }

        // GET: api/gradovi
        [HttpGet]
        public async Task<ActionResult> DohvatiGradove()
        {
            ICollection<Grad> listaGradova = await _gradService.DohvatiGradove();

            if (!listaGradova.Any())
            {
                return NotFound();
            }

            return Ok(listaGradova);
        }

        // GET: api/gradovi/5
        [HttpGet("{id}")]
        public async Task<ActionResult> DohvatiGrad(int id)
        {
            Grad grad = await _gradService.DohvatiGrad(id);

            if (grad == null)
            {
                return NotFound();
            }

            return Ok(grad);
        }

        // GET: api/drzave/id/gradovi
        [HttpGet]
        [Route("~/api/drzave/{id:int}/gradovi")]
        public async Task<ActionResult> DohvatiGradovePoDrzavama(int id)
        {
            ICollection<Grad> listaGradova = await _gradService.DohvatiGradovePoDrzavi(id);

            if (!listaGradova.Any())
            {
                return NotFound();
            }

            return Ok(listaGradova);
        }

        // POST: api/gradovi
        [HttpPost]
        public async Task<ActionResult> ZapisiGrad(Grad grad)
        {
            await _gradService.ZapisiGrad(grad);

            return CreatedAtAction("DohvatiGrad", new { id = grad.Id }, grad);
        }

        // PUT: api/gradovi/5
        [HttpPut("{id}")]
        public async Task<ActionResult> IzmijeniGrad(int id, Grad grad)
        {
            if (id != grad.Id)
            {
                return BadRequest();
            }

            Grad spremljenNoviGrad = await _gradService.IzmijeniGrad(grad);

            if (spremljenNoviGrad == grad)
            {
                return CreatedAtAction("DohvatiGrad", new { id = grad.Id }, spremljenNoviGrad);
            }
            else if (spremljenNoviGrad == null)
            {
                return NoContent();
            }
            return BadRequest();
        }

        // DELETE: api/gradovi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Grad>> ObrisiGrad(int id)
        {
            Grad obrisaniGrad = await _gradService.ObrisiGrad(id);
            if (obrisaniGrad == null)
            {
                return NotFound();
            }
            return obrisaniGrad;
        }
    }
}
