using System.ComponentModel.DataAnnotations;

namespace Entertainment_Chronicles.Models
{
    public class Users
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string? Name { get; set; }

        [Required]
        public string? Email { get; set; }
    }
}
