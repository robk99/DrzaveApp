namespace DAL.Interfaces.Models
{
    public interface ILoginUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
