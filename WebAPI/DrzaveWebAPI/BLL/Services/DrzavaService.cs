﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using BLL.Interfaces.Services;
using DAL;
using DAL.Models;

namespace BLL.Services
{
    public class DrzavaService : IDrzavaService
    {
        private readonly DrzavedbContext _context;

        public DrzavaService(DrzavedbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Drzava>> DohvatiDrzave()
        {
            return await _context.Drzave.ToListAsync();
        }

        public async Task<Drzava> DohvatiDrzavu(int id)
        {
            return await _context.Drzave.FindAsync(id);
        }

        public async Task<Drzava> ZapisiDrzavu(Drzava drzava)
        {
            await _context.Drzave.AddAsync(drzava);
            await _context.SaveChangesAsync();

            return drzava;
        }

        public async Task<Drzava> IzmijeniDrzavu(Drzava drzava)
        {
            try
            {
                _context.Entry(drzava).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return drzava;
            }
            catch
            {
                if (!DrzavaPostoji(drzava.Id))
                {
                    drzava = null;
                }
                return drzava;
            }
        }

        public async Task<Drzava> IzbrisiDrzavu(int id)
        {
            Drzava drzava = await _context.Drzave.FindAsync(id);
            if (drzava == null)
            {
                return drzava;
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