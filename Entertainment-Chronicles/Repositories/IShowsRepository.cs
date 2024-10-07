using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface IShowsRepository
    {
        public List<Shows> GetAllShows();
        public Shows GetShowById(int id);
        void AddShow(Shows show);
        void UpdateShow(Shows show);
        void DeleteShow(int showId);
    }
}
