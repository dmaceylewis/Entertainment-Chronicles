using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface IUsersRepository
    {
        public List<Users> GetAllUsers();
        public Users GetUserByEmail(string email);
        public Users GetUserById(int id);
        void AddUser(Users user);
    }
}
