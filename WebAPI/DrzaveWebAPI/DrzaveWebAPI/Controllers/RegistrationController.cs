using AutoMapper;
using BLL.Interfaces.Services;
using BLL.Services;
using Entities.DTOs;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly string _registrationUrl;
        private readonly IMapper _mapper;

        public RegistrationController(IUserService service, IConfiguration config, IMapper mapper)
        {
            _configuration = config;
            _userService = service;
            _registrationUrl = _configuration.GetSection("RegistrationUrl").Value;
            _mapper = mapper;
        }

        // POST: api/registration
        [HttpPost]
        public async Task<ActionResult> PostUser(UserDto user)
        {
            UserDto fetchedUser = GetUser(user.Username).Result;
            if (fetchedUser != null)
            {
                return Conflict();
            }

            User userEntity = _mapper.Map<User>(user);
            await _userService.PostUser(userEntity);
            return Created(_registrationUrl, user);
        }

        public async Task<UserDto> GetUser(string username)
        {
            User userEntity = await _userService.GetUser(username);
            UserDto user = _mapper.Map<User, UserDto>(userEntity);

            return user;
        }

    }
}
