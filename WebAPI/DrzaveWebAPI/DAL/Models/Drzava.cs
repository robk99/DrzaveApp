using DAL.Interfaces.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DAL.Models
{
    public class Drzava : IDrzava
    {
        public Drzava()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Ime { get; set; }

        [JsonIgnore]
        public virtual ICollection<Grad> Gradovi { get; set; }
    }
}
