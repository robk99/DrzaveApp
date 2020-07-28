using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace DrzaveWebAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class EchoController : Controller
    {
        // GET: api/echo/someText
        [HttpGet]
        [Route("api/echo/{attributeString}")]
        public IEnumerable<string> Echo([FromRoute] string attributeString)
        {
            return new string[] { $"{attributeString} to you too Guest!" };
        }


        // GET: api/authecho/someText
        [HttpGet, Authorize]
        [Route("api/authecho/{attributeString}")]
        public IEnumerable<string> AuthEcho(string attributeString)
        {
            return new string[] { $"{attributeString} to you too Authorized user!" };
        }
    }
}
