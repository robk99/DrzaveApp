using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace BLL.Services.Authentication
{
    public static class AuthenticationService
    {
        public static IServiceCollection AddAuthenticationService(this IServiceCollection services, IConfiguration configuration)
        {
            string angularBaseUrl = configuration.GetSection("AngularBaseUrl").Value;
            RSA publicRsa = RSA.Create();
            publicRsa.FromXmlFile(Path.Combine(Directory.GetCurrentDirectory(),
                             configuration.GetValue<String>("Tokens:PublicKey")
                             ));
            RsaSecurityKey signingKey = new RsaSecurityKey(publicRsa);



            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = angularBaseUrl,
                    ValidAudience = angularBaseUrl,
                    IssuerSigningKey = signingKey,
                    ClockSkew = TimeSpan.Zero
                };
            });

            return services;
        }

    }
}
