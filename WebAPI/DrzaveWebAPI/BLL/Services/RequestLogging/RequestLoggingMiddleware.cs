﻿using Microsoft.AspNetCore.Http;
using Microsoft.IO;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using NLog;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BLL.Services.RequestLogging
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
            if (context.Request.Method != "OPTIONS")
            {
                await LogRequest(context);
                await LogResponse(context);
            }
            else
            {
                await _next(context);
            }
        }


        private async Task LogRequest(HttpContext context)
        {
            _stopwatch = Stopwatch.StartNew();
            context.Request.Headers.Add("X-Request-Guid", Guid.NewGuid().ToString());

            context.Request.EnableBuffering();
            await using MemoryStream requestStream = _recyclableMemoryStreamManager.GetStream();
            await context.Request.Body.CopyToAsync(requestStream);
            string bodyString = ReadStreamInChunks(requestStream);
            
            Object body;
            if (bodyString != string.Empty)
            {
                body = JsonConvert.DeserializeObject(bodyString);
            }
            else
            {
                body = new JObject();
            }

            RequestModel requestModel = new RequestModel()
            {
                requestStart = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss.fff tt"),
                method = context.Request.Method,
                schema = context.Request.Scheme,
                host = context.Request.Host.ToString(),
                path = context.Request.Path,
                requestBody = body,
                requestGuid = context.Request.Headers["X-Request-Guid"]
            };

            _logger.Info("{request}", requestModel);

            context.Request.Body.Position = 0;
        }

        private static string ReadStreamInChunks(Stream stream)
        {
            const int readChunkBufferLength = 4096;
            stream.Seek(0, SeekOrigin.Begin);
            using StringWriter textWriter = new StringWriter();
            using StreamReader reader = new StreamReader(stream);
            char[] readChunk = new char[readChunkBufferLength];
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
            Stream originalBodyStream = context.Response.Body;
            await using MemoryStream responseBody = _recyclableMemoryStreamManager.GetStream();
            context.Response.Body = responseBody;
            await _next(context);
            context.Response.Body.Seek(0, SeekOrigin.Begin);
            string bodyString = await new StreamReader(context.Response.Body).ReadToEndAsync();

            Object body;
            if (bodyString != string.Empty)
            {
                body = JsonConvert.DeserializeObject(bodyString);
            }
            else
            {
                body = new JObject();
            }

            ResponseModel responseModel = new ResponseModel()
            {
                requestEnd = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss.fff tt"),
                responseBody = body,
                responseGuid = context.Response.Headers["X-Request-Guid"],
                statusCode = context.Response.StatusCode.ToString(),
                requestDuration = _stopwatch.ElapsedMilliseconds
            };

            _logger.Info("{response}", responseModel);

            context.Response.Body.Seek(0, SeekOrigin.Begin);
            await responseBody.CopyToAsync(originalBodyStream);
        }
    }
}
