using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BLL.Interfaces.Services;
using System.Threading.Tasks;
using DAL;

namespace DrzaveWebAPI.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly CountriesdbContext _context;
        private readonly IConfiguration configuration;
        private readonly ITokenService tokenService;
        private readonly IUserService _userService;


        public LoginController(CountriesdbContext context, IConfiguration config, ITokenService tokenService, IUserService service)
        {
            _context = context;
            configuration = config;
            this.tokenService = tokenService;
            _userService = service;
        }

        public async Task<ActionResult<User>> GetUser(string username)
        {
            User user = await _userService.GetUser(username);

            if (user == null)
            {
                return NotFound(user);
            }

            return user;
        }

        // POST: api/login
        [HttpPost]
        public IActionResult Login([FromBody]User user)
        {
            User fetchedUser = GetUser(user.Username).Result.Value;

            if (fetchedUser == null)
            {
                return BadRequest("Invalid client request");
            }

           
            if (user.Username == fetchedUser.Username && user.Password == fetchedUser.Password)
            {
                
                string tokenString = tokenService.GetToken(configuration, user);

                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
