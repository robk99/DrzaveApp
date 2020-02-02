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
using BLL.ErrorHandling;
using BLL.RequestLogging;
using NLog;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Web.Http;

namespace DrzaveWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public HttpConfiguration Config { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IDrzavaService, DrzavaService>();
            services.AddTransient<IGradService, GradService>();
            services.AddEntityFrameworkNpgsql().AddDbContext<DrzavedbContext>(opt => opt.UseNpgsql(Configuration.GetConnectionString("DrzaveConnection")))
                .AddUnitOfWork<DrzavedbContext>();
            services.AddControllers().AddNewtonsoftJson();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                    });
            });

        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMyMiddleware();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
