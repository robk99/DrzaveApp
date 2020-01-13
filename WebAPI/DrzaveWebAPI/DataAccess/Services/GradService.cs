using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Interfaces.Services;
using BusinessLogic.Models;
using BusinessLogic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Services
{
    class GradService : IGradService
    {
        private readonly DrzavedbContext _context;
        public GradService(DrzavedbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Grad>> DohvatiGradove()
        {
            return await _context.Gradovi.ToListAsync(); /*   CASE AKO JE NULL    */
        }

        public async Task<Grad> DohvatiGrad(int id)
        {
            return await _context.Gradovi.FindAsync(id); /*   CASE AKO JE NULL    */
        }
        public async Task<Grad> ZapisiGrad(Grad grad)
        {
            await _context.Gradovi.AddAsync(grad);
            await _context.SaveChangesAsync();

            return grad; /*  CASE AKO JE NULL     */
        }

        public async Task<Grad> IzmijeniGrad(int id, Grad grad)
        {
            _context.Entry(grad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradPostoji(id))
                {
                    return grad; /*    CASE AKO JE NULL    */
                }
                else
                {
                    throw;
                }
            }

            return grad; /*    CASE AKO JE NULL    */
        }

        public async Task<Grad> ObrisiGrad(int id)
        {
            Grad grad = await _context.Gradovi.FindAsync(id);
            if (grad == null)
            {
                return grad; /*  CASE AKO JE NULL   */
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
