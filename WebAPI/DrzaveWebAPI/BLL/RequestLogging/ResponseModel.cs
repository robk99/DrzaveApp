using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.RequestLogging
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
