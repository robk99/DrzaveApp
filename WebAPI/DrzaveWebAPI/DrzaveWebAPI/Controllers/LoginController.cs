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

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration configuration;
        private ITokenService tokenService;

        public LoginController(IConfiguration config, ITokenService tokenService)
        {
            configuration = config;
            this.tokenService = tokenService;
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginUser user)
        {
            // Check if User exists on database

            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

           
            if (user.Username == "john" && user.Password == "123")
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
