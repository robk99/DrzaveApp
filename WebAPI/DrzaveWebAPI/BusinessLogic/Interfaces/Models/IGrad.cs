using BusinessLogic.Models;

namespace BusinessLogic.Interfaces.Models
{
    public interface IGrad
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public int? Populacija { get; set; }
        public Drzava Drzava { get; set; }
    }
}
