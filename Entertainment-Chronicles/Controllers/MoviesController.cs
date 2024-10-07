using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesRepository _moviesRepository;
        public MoviesController(IMoviesRepository moviesRepository)
        {
            _moviesRepository = moviesRepository;
        }

        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var movies = _moviesRepository.GetAllMovies();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        public IActionResult GetMovieById(int id)
        {
            var movies = _moviesRepository.GetMovieById(id);
            if (movies == null)
            {
                return NotFound();
            }
            return Ok(movies);
        }

        [HttpPost]
        public IActionResult AddMovie(Movies movie)
        {
            if (movie == null)
            {
                return BadRequest();
            }
            _moviesRepository.AddMovie(movie);
            return CreatedAtAction("Get", new { id = movie.Id }, movie);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Movies movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }
            _moviesRepository.UpdateMovie(movie);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _moviesRepository.DeleteMovie(id);
            return NoContent();
        }
    }
}
