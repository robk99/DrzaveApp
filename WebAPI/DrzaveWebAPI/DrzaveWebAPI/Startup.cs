using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DAL;
using BLL.Interfaces.Services;
using BLL.Services;
using NLog;
using System;
using System.IO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DrzaveWebAPI
{
    public class Startup
    {
        private string angularBaseUrl;
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
            angularBaseUrl = configuration.GetSection("AngularBaseUrl").Value;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IDrzavaService, DrzavaService>();
            services.AddTransient<IGradService, GradService>();
            services.AddEntityFrameworkNpgsql().AddDbContext<DrzavedbContext>(opt => opt.UseNpgsql(Configuration.GetConnectionString("DrzaveConnection")))
                .AddUnitOfWork<DrzavedbContext>();
            services.AddAuthenticationService(Configuration);
            services.AddControllers().AddNewtonsoftJson();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins(angularBaseUrl).AllowAnyHeader().AllowAnyMethod();
                    });
            });

        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCustomRequestLoggingMiddleware();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCustomExceptionHandlingMiddleware();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
