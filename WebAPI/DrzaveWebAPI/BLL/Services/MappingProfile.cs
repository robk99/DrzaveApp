using AutoMapper;
using Entities.DTOs;
using Entities.Models;

namespace BLL.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<Country, CountryDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
