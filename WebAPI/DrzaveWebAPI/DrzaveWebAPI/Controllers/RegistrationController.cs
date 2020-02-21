using BLL.Interfaces.Services;
using ENTITIES.Models;
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

        public RegistrationController(IUserService service, IConfiguration config)
        {
            _configuration = config;
            _userService = service;
            _registrationUrl = _configuration.GetSection("RegistrationUrl").Value;
        }

        // POST: api/registration
        [HttpPost]
        public async Task<ActionResult> PostUser(User user)
        {
            await _userService.PostUser(user);

            return Created(_registrationUrl, user);
        }

    }
}
