using BusinessLogic.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.Services
{
    public interface IGradService
    {
        Task<ICollection<Grad>> DohvatiGradove();
        Task<Grad> DohvatiGrad(int id);
        Task<ICollection<Grad>> DohvatiGradovePoDrzavi(int id);
        Task<Grad> ZapisiGrad(Grad grad);
        Task<Grad> IzmijeniGrad(Grad grad);
        Task<Grad> IzbrisiGrad(int id);
    }
}
