using DAL.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    class LoginUser : ILoginUser
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
