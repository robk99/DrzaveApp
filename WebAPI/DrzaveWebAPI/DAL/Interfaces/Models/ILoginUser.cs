namespace DAL.Interfaces.Models
{
    public interface ILoginUser
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
