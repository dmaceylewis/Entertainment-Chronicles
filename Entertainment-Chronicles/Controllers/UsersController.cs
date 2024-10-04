using Microsoft.AspNetCore.Mvc;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Repositories;

namespace Entertainment_Chronicles.Controllers
{
     [Route("api/[controller]")]
     [ApiController]
     public class UsersController : ControllerBase
     {
        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _usersRepository.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _usersRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _usersRepository.GetUserByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(Users user)
        {
            if (user== null)
            {
                return BadRequest();
            }
            _usersRepository.AddUser(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

    }
}
