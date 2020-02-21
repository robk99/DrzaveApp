using Entities.Models;
using System.Threading.Tasks;

namespace BLL.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> GetUser(string username);
        Task<User> PostUser(User loginUser);
    }
}
