using BusinessLogic.Interfaces.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [ForeignKey("drzava_id")]
        public int? DrzavaId { get; set; }

        [JsonIgnore]
        public Drzava Drzava { get; set; }
    }
}
