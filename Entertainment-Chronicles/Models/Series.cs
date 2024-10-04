using System.ComponentModel.DataAnnotations;

namespace Entertainment_Chronicles.Models
{
    public class Series
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string? Name { get; set; }

        public int CollectionId { get; set; }

        public Collections? Collections { get; set; }
    }
}
