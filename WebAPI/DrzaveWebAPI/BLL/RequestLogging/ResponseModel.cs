using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.RequestLogging
{
    class ResponseModel
    {
        public string requestEnd { get; set; }
        public string schema { get; set; }
        public string host { get; set; }
        public string path { get; set; }
        public string responseBody { get; set; }
        public string responseGUID { get; set; }
        public string statusCode { get; set; }
        public float requestDuration { get; set; }
    }
}
