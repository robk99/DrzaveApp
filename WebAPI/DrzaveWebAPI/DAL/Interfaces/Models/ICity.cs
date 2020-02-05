namespace DAL.Interfaces.Models
{
    public interface ICity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Population { get; set; }
        public int? CountryId { get; set; }
    }
}
