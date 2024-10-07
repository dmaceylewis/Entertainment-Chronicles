using Entertainment_Chronicles.Models;

namespace Entertainment_Chronicles.Repositories
{
    public interface IBooksRepository
    {
        public List<Books> GetAllBooks();
        public Books GetBookById(int id);
        void AddBook(Books book);
        void UpdateBook(Books book);
        public void DeleteBook(int bookId);
    }
}
