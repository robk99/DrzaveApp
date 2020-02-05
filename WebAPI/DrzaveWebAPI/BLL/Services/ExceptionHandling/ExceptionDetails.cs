using Newtonsoft.Json;

namespace BLL.Services.ExceptionHandling
{
    public class ExceptionDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
