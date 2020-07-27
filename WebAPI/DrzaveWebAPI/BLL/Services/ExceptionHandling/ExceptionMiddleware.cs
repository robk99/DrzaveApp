using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace BLL.Services.ExceptionHandling
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly NLog.Logger _logger;
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
            _logger = NLog.LogManager.GetCurrentClassLogger();
        }
         
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.Log(NLog.LogLevel.Error, ex, $"\nGUID: {httpContext.Request.Headers["X-Request-Guid"]}\n We encountered an InternalServerError Exception!: ");
                await new ResponseExceptionHandling().HandleExceptionAsync(httpContext);
            }
        }
    }
}
