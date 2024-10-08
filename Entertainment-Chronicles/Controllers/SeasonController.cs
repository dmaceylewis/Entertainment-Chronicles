using Microsoft.AspNetCore.Mvc;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Azure;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonController : ControllerBase
    {
        private readonly ISeasonRepository _seasonRepository;
        public SeasonController(ISeasonRepository seasonRepository)
        {
            _seasonRepository = seasonRepository;
        }

        [HttpGet]
        public IActionResult GetAllSeasons()
        {
            var seasons = _seasonRepository.GetAllSeasons();
            return Ok(seasons);
        }

        [HttpGet("{id}")]
        public IActionResult GetSeasonById(int id)
        {
            var season = _seasonRepository.GetSeasonById(id);
            if (season == null)
            {
                return NotFound();
            }
            return Ok(season);
        }

        [HttpPost]
        public IActionResult Post(Season season)
        {
            if (season == null)
            {
                return BadRequest();
            }
            _seasonRepository.AddSeason(season);
            return CreatedAtAction("Get", new { id = season.Id }, season);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Season season)
        {
            if (id != season.Id)
            {
                return BadRequest();
            }
            _seasonRepository.UpdateSeason(season);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _seasonRepository.DeleteSeason(id);
            return NoContent();
        }
    }
}
