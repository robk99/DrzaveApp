using ENTITIES.Interfaces.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ENTITIES.Models
{
    public class Country : ICountry
    {
        public Country()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<City> Cities { get; set; }
    }
}
