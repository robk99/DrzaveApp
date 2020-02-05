using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace DrzaveWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration configuration;
        private string angularBaseUrl;

        public LoginController(IConfiguration config)
        {
            this.configuration = config;
            angularBaseUrl = configuration.GetSection("AngularBaseUrl").Value;
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginUser user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            if (user.username == "john" && user.password == "123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: angularBaseUrl,
                    audience: angularBaseUrl,
                    expires: DateTime.Now.AddMinutes(100),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
