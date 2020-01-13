using BusinessLogic.Interfaces.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessLogic.Models
{
    public class Grad : IGrad
    {
        public Grad()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Ime { get; set; }
        public int? Populacija { get; set; }
        public int? DrzavaId { get; set; }
    }
}
