using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Interfaces.DTOs
{
    public interface ICityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Population { get; set; }
        public int? CountryId { get; set; }
    }
}
