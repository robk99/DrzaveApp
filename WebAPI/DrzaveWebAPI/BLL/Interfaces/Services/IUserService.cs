using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> GetUser(string username, string password);
        Task<User> PostUser(User loginUser);
    }
}
