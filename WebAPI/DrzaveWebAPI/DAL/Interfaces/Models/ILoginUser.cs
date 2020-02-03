using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Interfaces.Models
{
    public interface ILoginUser
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
