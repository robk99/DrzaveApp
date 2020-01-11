using BusinessLogic.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class Grad : IGrad
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public int Populacija { get; set; }
        public int DrzavaId { get; set; }
    }
}
