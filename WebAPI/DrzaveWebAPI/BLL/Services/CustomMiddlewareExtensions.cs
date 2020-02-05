using BLL.Services.ExceptionHandling;
using BLL.Services.RequestLogging;
using Microsoft.AspNetCore.Builder;

namespace BLL.Services
{
    public static class CustomMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomRequestLoggingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggingMiddleware>();
        }

        public static IApplicationBuilder UseCustomExceptionHandlingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
