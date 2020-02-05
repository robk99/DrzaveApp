using System;

namespace BLL.Services.RequestLogging
{
    class RequestModel
    {
        public string requestStart { get; set; }
        public string method { get; set; }
        public string schema { get; set; }
        public string host { get; set; }
        public string path { get; set; }
        public Object requestBody { get; set; }
        public string requestGuid { get; set; }
    }
}
