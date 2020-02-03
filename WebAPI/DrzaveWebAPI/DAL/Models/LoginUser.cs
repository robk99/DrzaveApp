using DAL.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class LoginUser : ILoginUser
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
