using BusinessLogic.Interfaces.Services;
using BusinessLogic.Models;
using BusinessLogic;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DataAccess.Services
{
    class DrzavaService : IDrzavaService
    {
        private readonly DrzavedbContext _context;

        public DrzavaService(DrzavedbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Drzava>> DohvatiDrzave()
        {
            return await _context.Drzave.ToListAsync(); /*   CASE AKO JE NULL   */
        }

        public async Task<Drzava> DohvatiDrzavu(int id)
        {
            return await _context.Drzave.FindAsync(id); /*   CASE AKO JE NULL   */
        }

        public async Task<Drzava> ZapisiDrzavu(Drzava drzava)
        {
            await _context.Drzave.AddAsync(drzava);
            await _context.SaveChangesAsync();

            return drzava; /*  CASE AKO JE NULL     */
        }

        public async Task<Drzava> IzmijeniDrzavu(int id, Drzava drzava)
        {
            _context.Entry(drzava).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DrzavaPostoji(id))
                {
                    return drzava; /*  CASE AKO JE NULL     */
                }
                else
                {
                    throw;
                }
            }

            return drzava; /*  CASE AKO JE NULL     */
        }

        public async Task<Drzava> ObrisiDrzavu(int id)
        {
            Drzava drzava = await _context.Drzave.FindAsync(id);
            if (drzava == null)
            {
                return drzava; /*  CASE AKO JE NULL     */
            }

            _context.Drzave.Remove(drzava);
            await _context.SaveChangesAsync();

            return drzava;
        }

        private bool DrzavaPostoji(int id)
        {
            return _context.Drzave.Any(d => d.Id == id);
        }
    }
}
