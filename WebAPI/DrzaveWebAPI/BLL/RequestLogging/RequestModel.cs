using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
        public Object requestBody { get; set; }
        public string requestGuid { get; set; }
    }
}
