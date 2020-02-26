namespace Entities.Interfaces.Models
{
    public interface IUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
