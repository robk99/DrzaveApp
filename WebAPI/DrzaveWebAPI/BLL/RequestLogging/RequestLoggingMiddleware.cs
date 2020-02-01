using Microsoft.AspNetCore.Http;
using Microsoft.IO;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using NLog;

namespace BLL.RequestLogging
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Logger _logger;
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;
        Stopwatch _stopwatch;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
            _logger = LogManager.GetCurrentClassLogger();
            _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();
        }

        public async Task Invoke(HttpContext context)
        {
            await LogRequest(context);
            await LogResponse(context);
        }


        private async Task LogRequest(HttpContext context)
        {
            context.Request.Headers.Add("X-Request-Guid", Guid.NewGuid().ToString());
            _stopwatch = Stopwatch.StartNew();
            context.Request.EnableBuffering();
            await using var requestStream = _recyclableMemoryStreamManager.GetStream();
            await context.Request.Body.CopyToAsync(requestStream);

            RequestModel requestModel = new RequestModel()
            {
                requestStart = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss.fff tt"),
                method = context.Request.Method,
                schema = context.Request.Scheme,
                host = context.Request.Host.ToString(),
                path = context.Request.Path,
                requestBody = ReadStreamInChunks(requestStream),
                requestGUID = context.Request.Headers["X-Request-Guid"]
            };
            _logger.Info("{REQUEST}", requestModel);

            context.Request.Body.Position = 0;
        }


        private static string ReadStreamInChunks(Stream stream)
        {
            const int readChunkBufferLength = 4096;
            stream.Seek(0, SeekOrigin.Begin);
            using var textWriter = new StringWriter();
            using var reader = new StreamReader(stream);
            var readChunk = new char[readChunkBufferLength];
            int readChunkLength;
            do
            {
                readChunkLength = reader.ReadBlock(readChunk, 0, readChunkBufferLength);
                textWriter.Write(readChunk, 0, readChunkLength);
            } while (readChunkLength > 0);
            return textWriter.ToString();
        }

        private async Task LogResponse(HttpContext context)
        {
            context.Response.Headers.Add("X-Request-Guid", context.Request.Headers["X-Request-Guid"].ToString());
            var originalBodyStream = context.Response.Body;
            await using var responseBody = _recyclableMemoryStreamManager.GetStream();
            context.Response.Body = responseBody;
            await _next(context);
            context.Response.Body.Seek(0, SeekOrigin.Begin);
            var text = await new StreamReader(context.Response.Body).ReadToEndAsync();
            context.Response.Body.Seek(0, SeekOrigin.Begin);

            ResponseModel responseModel = new ResponseModel()
            {
                requestEnd = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss.fff tt"),
                schema = context.Request.Scheme,
                host = context.Request.Host.ToString(),
                path = context.Request.Path,
                responseBody = text,
                responseGUID = context.Response.Headers["X-Request-Guid"],
                statusCode = context.Response.StatusCode.ToString(),
                requestDuration = _stopwatch.ElapsedMilliseconds
            };

            _logger.Info("{RESPONSE}", responseModel);

            await responseBody.CopyToAsync(originalBodyStream);
        }


    }
}
