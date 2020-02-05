using System;

namespace BLL.Services.RequestLogging
{
    class ResponseModel
    {
        public string requestEnd { get; set; }
        public Object responseBody { get; set; }
        public string responseGuid { get; set; }
        public string statusCode { get; set; }
        public float requestDuration { get; set; }
    }
}
