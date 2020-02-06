using DAL.Interfaces.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class User : IUser
    {
        public User()
        {
        }

        [Required, Key]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
