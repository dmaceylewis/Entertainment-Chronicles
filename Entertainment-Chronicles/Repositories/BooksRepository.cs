using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class BooksRepository : BaseRepository, IBooksRepository
    {
        public BooksRepository(IConfiguration configuration) : base(configuration) { }

        public List<Books> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT b.Id, b.Title, b.Author,
                              b.[Order], b.[Read],
                              b.SeriesId, b.PlatformId,
                              s.[Name] AS SeriesName,
                              pf.[Name] AS PlatformName
                         FROM Books b
                              LEFT JOIN Series s ON b.SeriesId = s.id
                              LEFT JOIN Platforms pf ON b.PlatformId = pf.id
                        ORDER BY b.[Order] ASC";

                    var reader = cmd.ExecuteReader();

                    var books = new List<Books>();

                    while (reader.Read())
                    {
                        books.Add(BooksFromReader(reader));
                    }

                    reader.Close();

                    return books;
                }
            }
        }

        public Books GetBookById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.Title, b.Author,
                              b.[Order], b.[Read],
                              b.SeriesId, b.PlatformId,
                              s.[Name] AS SeriesName,
                              pf.[Name] AS PlatformName
                         FROM Books b
                              LEFT JOIN Series s ON b.SeriesId = s.id
                              LEFT JOIN Platforms pf ON b.PlatformId = pf.id
                        WHERE b.Id = @Id
                        ORDER BY b.[Order] ASC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Books book = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        book = BooksFromReader(reader);
                    }
                    reader.Close();

                    return book;
                }
            }
        }

        public void AddBook(Books book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Books (Title, Author, [Order], [Read], SeriesId, PlatformId)
                    OUTPUT INSERTED.ID
                    VALUES (@Title, @Author, @Order, @Read, @SeriesId, @PlatformId);";

                    DbUtils.AddParameter(cmd, "@Title", book.Title);
                    DbUtils.AddParameter(cmd, "@Author", book.Author);
                    DbUtils.AddParameter(cmd, "@Order", book.Order);
                    DbUtils.AddParameter(cmd, "@Read", book.Read);
                    DbUtils.AddParameter(cmd, "@SeriesId", book.SeriesId);
                    DbUtils.AddParameter(cmd, "@PlatformId", book.PlatformId);

                    int id = (int)cmd.ExecuteScalar();

                    book.Id = id;
                }
            }
        }

        public void UpdateBook(Books book)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Books
                            SET Title = @Title
                                Author = @Author
                                Order = @Order
                                Read = @Read
                                SeriesId = @SeriesId
                                PlatformId = @PlatformId
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", book.Title);
                    DbUtils.AddParameter(cmd, "@Author", book.Author);
                    DbUtils.AddParameter(cmd, "@Order", book.Order);
                    DbUtils.AddParameter(cmd, "@Read", book.Read);
                    DbUtils.AddParameter(cmd, "@SeriesId", book.SeriesId);
                    DbUtils.AddParameter(cmd, "@PlatformId", book.PlatformId);
                    DbUtils.AddParameter(cmd, "@Id", book.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBook(int bookId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Books
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", bookId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Books BooksFromReader(SqlDataReader reader)
        {
            return new Books()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Author = reader.GetString(reader.GetOrdinal("Author")),
                Order = reader.GetInt32(reader.GetOrdinal("Order")),
                Read = reader.GetBoolean(reader.GetOrdinal("Read")),
                SeriesId = reader.GetInt32(reader.GetOrdinal("SeriesId")),
                Series = new Series()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("SeriesId")),
                    Name = reader.GetString(reader.GetOrdinal("SeriesName"))
                },
                PlatformId = reader.GetInt32(reader.GetOrdinal("PlatformId")),
                Platforms = new Platforms()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("PlatformId")),
                    Name = reader.GetString(reader.GetOrdinal("PlatformName"))
                }
               
            };
        }
    }
}
