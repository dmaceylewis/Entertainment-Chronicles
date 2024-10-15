using Microsoft.AspNetCore.Mvc;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Azure;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private readonly ISeriesRepository _seriesRepository;
        public SeriesController(ISeriesRepository seriesRepository)
        {
            _seriesRepository = seriesRepository;
        }

        [HttpGet]
        public IActionResult GetAllSeries()
        {
            var series = _seriesRepository.GetAllSeries();
            return Ok(series);
        }

        [HttpGet("{id}")]
        public IActionResult GetSeriesById(int id)
        {
            var series = _seriesRepository.GetSeriesById(id);
            if (series == null)
            {
                return NotFound();
            }
            return Ok(series);
        }

        [HttpPost]
        public IActionResult Post(Series series)
        {
            if (series == null)
            {
                return BadRequest();
            }
            _seriesRepository.AddSeries(series);
            return CreatedAtAction("GetSeriesById", new { id = series.Id }, series);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Series series)
        {
            if (id != series.Id)
            {
                return BadRequest();
            }
            _seriesRepository.UpdateSeries(series);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _seriesRepository.DeleteSeries(id);
            return NoContent();
        }
    }
}
