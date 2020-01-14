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

        // POST: api/gradovi
        [HttpPost]
        public async Task<ActionResult> ZapisiGrad(Grad grad)
        {
            await _gradService.ZapisiGrad(grad);

            return CreatedAtAction("DohvatiGrad", new { id = grad.Id }, grad);
        }

        // PUT: api/gradovi
        [HttpPut]
        public async Task<ActionResult> IzmijeniGrad(Grad grad)
        {
            Grad izvuceniGrad = await _gradService.IzmijeniGrad(grad);

            if (izvuceniGrad == grad)
            {
                return CreatedAtAction("DohvatiGrad", new { id = grad.Id }, izvuceniGrad);
            }
            else if (izvuceniGrad == null)
            {
                return NotFound();
            }
            return BadRequest();
        }

        // DELETE: api/gradovi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> ObrisiGrad(int id)
        {
            Grad obrisaniGrad = await _gradService.ObrisiGrad(id);
            if (obrisaniGrad == null)
            {
                return NotFound();
            }
            return Ok(obrisaniGrad);
        }
    }
}
