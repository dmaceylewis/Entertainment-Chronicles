using System.ComponentModel.DataAnnotations;

namespace Entertainment_Chronicles.Models
{
    public class Collections
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public Users? Users { get; set; }

        [Required]
        [MaxLength(150)]
        public string? Name { get; set; }
    }
}
