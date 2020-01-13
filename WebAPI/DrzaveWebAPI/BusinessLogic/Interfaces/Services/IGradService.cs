using BusinessLogic.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces.Services
{
    public interface IGradService
    {
        Task<ICollection<Grad>> DohvatiGradove();
        Task<Grad> DohvatiGrad(int id);
        Task<Grad> ZapisiGrad(Grad grad);
        Task<Grad> IzmijeniGrad(int id, Grad grad);
        Task<Grad> ObrisiGrad(int id);
    }
}
