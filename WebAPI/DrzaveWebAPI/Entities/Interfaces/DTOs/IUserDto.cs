using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Interfaces.DTOs
{
    public interface IUserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
