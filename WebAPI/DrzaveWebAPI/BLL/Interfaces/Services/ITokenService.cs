using Entities.DTOs;
using Microsoft.Extensions.Configuration;

namespace BLL.Interfaces.Services
{
    public interface ITokenService
    {
        string GetToken(IConfiguration configuration, UserDto loginUser);
    }
}
