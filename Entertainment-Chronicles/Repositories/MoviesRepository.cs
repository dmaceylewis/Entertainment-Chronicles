using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class MoviesRepository : BaseRepository, IMoviesRepository
    {
        public MoviesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Movies> GetAllMovies()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT m.Id, m.Title,
                              m.[Order], m.Watched,
                              m.SeriesId, m.PlatformId,
                              s.[Name] AS SeriesName,
                              pf.[Name] AS PlatformName
                         FROM Movies m
                              LEFT JOIN Series s ON m.SeriesId = s.id
                              LEFT JOIN Platforms pf ON m.PlatformId = pf.id
                        ORDER BY m.[Order] ASC";

                    var reader = cmd.ExecuteReader();

                    var movies = new List<Movies>();

                    while (reader.Read())
                    {
                        movies.Add(MoviesFromReader(reader));
                    }

                    reader.Close();

                    return movies;
                }
            }
        }

        public Movies GetMovieById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.Title,
                              m.[Order], m.Watched,
                              m.SeriesId, m.PlatformId,
                              s.[Name] AS SeriesName,
                              pf.[Name] AS PlatformName
                         FROM Movies m
                              LEFT JOIN Series s ON b.SeriesId = s.id
                              LEFT JOIN Platforms pf ON b.PlatformId = pf.id
                        WHERE up.Id = @Id
                        ORDER BY m.[Order] ASC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Movies movie = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        movie = MoviesFromReader(reader);
                    }
                    reader.Close();

                    return movie;
                }
            }
        }

        public void AddMovie(Movies movie)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Movies (Title, [Order], Watched, SeriesId, PlatformId)
                    OUTPUT INSERTED.ID
                    VALUES (@Title, @Order, @Watched, @SeriesId, @PlatformId);";

                    DbUtils.AddParameter(cmd, "@Title", movie.Title);
                    DbUtils.AddParameter(cmd, "@Order", movie.Order);
                    DbUtils.AddParameter(cmd, "@Watched", movie.Watched);
                    DbUtils.AddParameter(cmd, "@SeriesId", movie.SeriesId);
                    DbUtils.AddParameter(cmd, "@PlatformId", movie.PlatformId);

                    int id = (int)cmd.ExecuteScalar();

                    movie.Id = id;
                }
            }
        }

        public void UpdateMovie(Movies movie)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Movies
                            SET Title = @Title
                                Order = @Order
                                Watched = @Watched
                                SeriesId = @SeriesId
                                PlatformId = @PlatformId
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", movie.Title);
                    DbUtils.AddParameter(cmd, "@Order", movie.Order);
                    DbUtils.AddParameter(cmd, "@Watched", movie.Watched);
                    DbUtils.AddParameter(cmd, "@SeriesId", movie.SeriesId);
                    DbUtils.AddParameter(cmd, "@PlatformId", movie.PlatformId);
                    DbUtils.AddParameter(cmd, "@Id", movie.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteMovie(int movieId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Movies
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", movieId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Movies MoviesFromReader(SqlDataReader reader)
        {
            return new Movies()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Order = reader.GetInt32(reader.GetOrdinal("Order")),
                Watched = reader.GetBoolean(reader.GetOrdinal("Watched")),
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
