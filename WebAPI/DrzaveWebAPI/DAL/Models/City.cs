using DAL.Interfaces.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DAL.Models
{
    public class City : ICity
    {
        public City()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int? Population { get; set; }

        [ForeignKey("country_id")]
        public int? CountryId { get; set; }

        [JsonIgnore]
        public Country Country { get; set; }
    }
}
