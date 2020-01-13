using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Interfaces.Models
{
    public interface IGrad
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public int? Populacija { get; set; }
        public int? DrzavaId { get; set; }
    }
}
