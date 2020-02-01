using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.RequestLogging
{
    class RequestModel
    {
        public string requestStart { get; set; }
        public string method { get; set; }
        public string schema { get; set; }
        public string host { get; set; }
        public string path { get; set; }
        public string requestBody { get; set; }
        public string requestGUID { get; set; }
    }
}
