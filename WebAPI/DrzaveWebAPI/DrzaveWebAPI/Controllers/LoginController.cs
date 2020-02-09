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
using Microsoft.AspNetCore.Http;

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
        private readonly NLog.Logger _logger;



        public LoginController(CountriesdbContext context, IConfiguration config, ITokenService tokenService, IUserService service)
        {
            _context = context;
            configuration = config;
            this.tokenService = tokenService;
            _userService = service;
            _logger = NLog.LogManager.GetCurrentClassLogger();

        }

        public async Task<User> GetUser(string username)
        {
            User user = await _userService.GetUser(username);

            return user;
        }

        // POST: api/login
        [HttpPost]
        public IActionResult Login([FromBody]User user)
        {
            try
            {
                User fetchedUser = GetUser(user.Username).Result;
                if (fetchedUser == null)
                {
                    return BadRequest();
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
            catch (AggregateException ex)
            {
                _logger.Log(NLog.LogLevel.Error, ex, $"We encountered an exception in communicating with database!: ");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

            
        }
    }
}
