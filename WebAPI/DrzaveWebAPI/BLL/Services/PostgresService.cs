using Arch.EntityFrameworkCore.UnitOfWork;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BLL.Services
{
    public static class PostgresService
    {
        public static IServiceCollection AddEFPostgresService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEntityFrameworkNpgsql().AddDbContext<CountriesdbContext>(opt => opt.UseNpgsql(configuration.GetConnectionString("CountriesAPPConnection")))
                .AddUnitOfWork<CountriesdbContext>();
            return services;
        }

    }
}
