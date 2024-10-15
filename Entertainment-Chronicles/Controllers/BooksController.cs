using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Entertainment_Chronicles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private readonly IBooksRepository _booksRepository;
        public BooksController(IBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _booksRepository.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var books = _booksRepository.GetBookById(id);
            if (books == null)
            {
                return NotFound();
            }
            return Ok(books);
        }

        [HttpPost]
        public IActionResult AddBook(Books book)
        {
            if (book == null)
            {
                return BadRequest();
            }
            _booksRepository.AddBook(book);
            return CreatedAtAction("GetBookById", new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Books book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            _booksRepository.UpdateBook(book);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _booksRepository.DeleteBook(id);
            return NoContent();
        }
    }
}
