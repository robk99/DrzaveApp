using Entities.Interfaces.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class CountryDto : ICountryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
