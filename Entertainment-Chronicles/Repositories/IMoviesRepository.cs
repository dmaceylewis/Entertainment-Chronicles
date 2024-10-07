using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface IMoviesRepository
    {
        public List<Movies> GetAllMovies();
        public Movies GetMovieById(int id);
        void AddMovie(Movies movie);
        void UpdateMovie(Movies movie);
        public void DeleteMovie(int movieId);
    }
}
