using Entities.Interfaces.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class UserDto : IUserDto
    {
        public UserDto()
        {

        }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
