using System.Collections.Generic;
using BusinessLogic.Interfaces.Services;
using BusinessLogic.Models;
using BusinessLogic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Services
{
    public class GradService : IGradService
    {
        private readonly DrzavedbContext _context;
        public GradService(DrzavedbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Grad>> DohvatiGradove()
        {
            return await _context.Gradovi.ToListAsync();
        }

        public async Task<Grad> DohvatiGrad(int id)
        {
            return await _context.Gradovi.FindAsync(id);
        }

        public async Task<ICollection<Grad>> DohvatiGradovePoDrzavi(int id)
        {
            ICollection<Grad> lista = await _context.Gradovi.Where<Grad>(g => g.DrzavaId == id).ToListAsync();
            return lista;
        }

        public async Task<Grad> ZapisiGrad(Grad grad)
        {
            await _context.Gradovi.AddAsync(grad);
            await _context.SaveChangesAsync();

            return grad;
        }

        public async Task<Grad> IzmijeniGrad(Grad grad)
        {
            try
            {
                _context.Entry(grad).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return grad;
            }
            catch
            {
                if (!GradPostoji(grad.Id))
                {
                    grad = null;
                }
                return grad;
            }
        }

        public async Task<Grad> ObrisiGrad(int id)
        {
            Grad grad = await _context.Gradovi.FindAsync(id);
            if (grad == null)
            {
                return grad;
            }

            _context.Gradovi.Remove(grad);
            await _context.SaveChangesAsync();

            return grad;
        }

        private bool GradPostoji(int id)
        {
            return _context.Gradovi.Any(g => g.Id == id);
        }

    }
}
