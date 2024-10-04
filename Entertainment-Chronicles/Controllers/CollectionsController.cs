using Microsoft.AspNetCore.Mvc;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Azure;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly ICollectionsRepository _collectionsRepository;
        public CollectionsController(ICollectionsRepository collectionsRepository)
        {
            _collectionsRepository = collectionsRepository;
        }

        [HttpGet]
        public IActionResult GetAllCollections()
        {
            var collections = _collectionsRepository.GetAllCollections();
            return Ok(collections);
        }

        [HttpGet("{id}")]
        public IActionResult GetCollectionById(int id)
        {
            var collection = _collectionsRepository.GetCollectionById(id);
            if (collection == null)
            {
                return NotFound();
            }
            return Ok(collection);
        }

        [HttpPost]
        public IActionResult Post(Collections collection)
        {
            if (collection == null)
            {
                return BadRequest();
            }
            _collectionsRepository.AddCollection(collection);
            return CreatedAtAction("Get", new { id = collection.Id }, collection);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Collections collection)
        {
            if (id != collection.Id)
            {
                return BadRequest();
            }
            _collectionsRepository.UpdateCollection(collection);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _collectionsRepository.DeleteCollection(id);
            return NoContent();
        }

    }
}
