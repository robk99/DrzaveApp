using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;

namespace BLL.Services.ExceptionHandling
{
    public static class ResponseExceptionHandling
    {
        public static Task HandleExceptionAsync(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            return context.Response.WriteAsync(new ExceptionDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error."
            }.ToString());
        }
    }
}
