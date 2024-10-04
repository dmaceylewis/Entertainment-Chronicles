using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface ISeriesRepository
    {
        public List<Series> GetAllSeries();
        public Series GetSeriesById(int id);
        void AddSeries(Series series);
        public void UpdateSeries(Series series);
        public void DeleteSeries(int id);

    }
}
