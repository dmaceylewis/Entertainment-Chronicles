using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly IShowsRepository _showsRepository;
        public ShowsController(IShowsRepository showsRepository)
        {
            _showsRepository = showsRepository;
        }

        [HttpGet]
        public IActionResult GetAllShows()
        {
            var shows = _showsRepository.GetAllShows();
            return Ok(shows);
        }

        [HttpGet("{id}")]
        public IActionResult GetShowById(int id)
        {
            var shows = _showsRepository.GetShowById(id);
            if (shows == null)
            {
                return NotFound();
            }
            return Ok(shows);
        }

        [HttpPost]
        public IActionResult AddShow(Shows show)
        {
            if (show == null)
            {
                return BadRequest();
            }
            _showsRepository.AddShow(show);
            return CreatedAtAction("Get", new { id = show.Id }, show);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Shows show)
        {
            if (id != show.Id)
            {
                return BadRequest();
            }
            _showsRepository.UpdateShow(show);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _showsRepository.DeleteShow(id);
            return NoContent();
        }
    }
}
