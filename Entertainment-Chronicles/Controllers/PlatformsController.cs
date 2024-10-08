using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformsController : ControllerBase
    {
        private readonly IPlatformsRepository _platformsRepository;
        public PlatformsController(IPlatformsRepository platformsRepository)
        {
            _platformsRepository = platformsRepository;
        }

        [HttpGet]
        public IActionResult GetAllPlatforms()
        {
            var platforms = _platformsRepository.GetAllPlatforms();
            return Ok(platforms);
        }

        [HttpGet("{id}")]
        public IActionResult GetPlatformId(int id)
        {
            var platform = _platformsRepository.GetPlatformById(id);
            if (platform == null)
            {
                return NotFound();
            }
            return Ok(platform);
        }

        [HttpPost]
        public IActionResult Post(Platforms platform)
        {
            if (platform == null)
            {
                return BadRequest();
            }
            _platformsRepository.AddPlatform(platform);
            return CreatedAtAction("Get", new { id = platform.Id }, platform);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Platforms platform)
        {
            if (id != platform.Id)
            {
                return BadRequest();
            }
            _platformsRepository.UpdatePlatform(platform);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _platformsRepository.DeletePlatform(id);
            return NoContent();
        }
    }
}
