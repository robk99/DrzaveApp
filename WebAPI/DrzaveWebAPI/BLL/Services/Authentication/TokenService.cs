using BLL.Interfaces.Services;
using DAL.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BLL.Services.Authentication
{
    public class TokenService : ITokenService
    {
        private string angularBaseUrl;

        public string GetToken(IConfiguration configuration, User loginUser)
        {
            var utcNow = DateTime.UtcNow;
            angularBaseUrl = configuration.GetSection("AngularBaseUrl").Value;


            using (RSA privateRsa = RSA.Create())
            {
                privateRsa.FromXmlFile(Path.Combine(Directory.GetCurrentDirectory(),
                                 configuration.GetValue<String>("Tokens:PrivateKey")
                                 ));
                var privateKey = new RsaSecurityKey(privateRsa);
                SigningCredentials signingCredentials = new SigningCredentials(privateKey, SecurityAlgorithms.RsaSha256);


                var claims = new Claim[]
                {
                new Claim(JwtRegisteredClaimNames.UniqueName, loginUser.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, utcNow.ToString())
                };

                var jwt = new JwtSecurityToken(
                    signingCredentials: signingCredentials,
                    claims: claims,
                    expires: utcNow.AddSeconds(configuration.GetValue<int>("Tokens:Lifetime")),
                    audience: angularBaseUrl,
                    issuer: angularBaseUrl
                    );

                return new JwtSecurityTokenHandler().WriteToken(jwt);
            }
        }
    }
}
