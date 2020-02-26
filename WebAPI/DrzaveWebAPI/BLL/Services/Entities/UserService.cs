using System.Threading.Tasks;
using BLL.Interfaces.Services;
using DAL;
using Entities.Models;
using System.Linq;


namespace BLL.Services.Entities
{
    public class UserService : IUserService
    {
        private readonly CountriesdbContext _context;
        private string hashedPassword;


        public UserService(CountriesdbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(string username)
        {
            return _context.Users.Where(user => user.Username == username).FirstOrDefault();
        }

        public async Task<User> PostUser(User user)
        {
            hashedPassword = HashUserPasswordService.HashPassword(user.Password);
            user.Password = hashedPassword;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
