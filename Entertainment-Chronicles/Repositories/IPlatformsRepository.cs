using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface IPlatformsRepository
    {
        public List<Platforms> GetAllPlatforms();
        public Platforms GetPlatformById(int id);
        void AddPlatform(Platforms platform);
        void UpdatePlatform(Platforms platform);
        void DeletePlatform(int platformId);
    }
}
