using BusinessLogic.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class Drzava : IDrzava
    {
        public int Id { get; set; }
        public string Ime { get; set; }

        public virtual ICollection<Grad> Gradovi { get; set; }
    }
}
