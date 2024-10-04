using System.ComponentModel.DataAnnotations;

namespace Entertainment_Chronicles.Models
{
    public class Movies
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string? Title { get; set; }

        public int Order { get; set; }

        public bool Watched { get; set; }

        public int PlatformId { get; set; }

        public Platforms? Platforms { get; set; }

        public int SeriesId { get; set; }

        public Series? Series { get; set; }
    }
}
