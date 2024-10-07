using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface ISeasonRepository
    {
        public List<Season> GetAllSeasons();
        public Season GetSeasonById(int id);
        void AddSeason(Season season);
        void UpdateSeason(Season season);
        void DeleteSeason(int seasonId);
    }
}
