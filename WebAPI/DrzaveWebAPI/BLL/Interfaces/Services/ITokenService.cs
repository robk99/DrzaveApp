using DAL.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces.Services
{
    public interface ITokenService
    {
        string GetToken(IConfiguration configuration, User loginUser);
    }
}
