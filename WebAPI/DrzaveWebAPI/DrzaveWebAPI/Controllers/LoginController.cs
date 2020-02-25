using Entities.Models;
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
using Microsoft.AspNetCore.Http;
using BLL.Services.ExceptionHandling;
using BLL.Services;


namespace DrzaveWebAPI.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly ITokenService tokenService;
        private readonly IUserService _userService;
        private readonly NLog.Logger _logger;
        private string hashedPassword;


        public LoginController(IConfiguration config, ITokenService tokenService, IUserService service)
        {
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
        public async Task<ActionResult> Login(User user)
        {
            try
            {
                User fetchedUser = GetUser(user.Username).Result;
                if (fetchedUser == null)
                {
                    return BadRequest();
                }

                bool isPasswordCorrect = HashUserPasswordService.ValidatePassword(fetchedUser.Password, user.Password);

                if (isPasswordCorrect)
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
                _logger.Log(NLog.LogLevel.Error, ex, $"\nGUID: {this.HttpContext.Request.Headers["X-Request-Guid"]}\n We encountered an exception in communicating with database!: ");
                await ResponseExceptionHandling.HandleExceptionAsync(this.HttpContext);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
