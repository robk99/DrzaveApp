using Entities.Models;
using Microsoft.Extensions.Configuration;

namespace BLL.Interfaces.Services
{
    public interface ITokenService
    {
        string GetToken(IConfiguration configuration, User loginUser);
    }
}
