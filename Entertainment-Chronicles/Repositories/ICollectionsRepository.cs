using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface ICollectionsRepository
    {
        public List<Collections> GetAllCollections();
        public Collections GetCollectionById(int id);
        void AddCollection(Collections collection);
        void UpdateCollection(Collections collection);
        void DeleteCollection(int collectionId);
    }
}
