using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class ShowsRepository : BaseRepository, IShowsRepository
    {
        public ShowsRepository(IConfiguration configuration) : base(configuration) { }


        public List<Shows> GetAllShows()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT tv.Id, tv.Title,
                              tv.[Order], tv.Watched,
                              b.SeriesId, tv.SeasonId,
                              tv.PlatformId,
                              s.[Name] AS SeriesName,
                              sea.[Number] AS SeasonNumber,
                              sea.Episode,
                              pf.[Name] AS PlatformName
                         FROM Books b
                              LEFT JOIN Series s ON tv.SeriesId = s.id
                              LEFT JOIN Season sea ON tv.SeriesId = sea.id
                              LEFT JOIN Platforms pf ON tv.PlatformId = pf.id
                        ORDER BY tv.[Order] ASC";

                    var reader = cmd.ExecuteReader();

                    var shows = new List<Shows>();

                    while (reader.Read())
                    {
                        shows.Add(ShowsFromReader(reader));
                    }

                    reader.Close();

                    return shows;
                }
            }
        }

        public Shows GetShowById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tv.Id, tv.Title,
                              tv.[Order], tv.Watched,
                              b.SeriesId, tv.SeasonId,
                              tv.PlatformId,
                              s.[Name] AS SeriesName,
                              sea.[Number] AS SeasonNumber,
                              sea.Episode,
                              pf.[Name] AS PlatformName
                         FROM Books b
                              LEFT JOIN Series s ON tv.SeriesId = s.id
                              LEFT JOIN Season sea ON tv.SeriesId = sea.id
                              LEFT JOIN Platforms pf ON tv.PlatformId = pf.id
                        ORDER BY tv.[Order] ASC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Shows show = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        show = ShowsFromReader(reader);
                    }
                    reader.Close();

                    return show;
                }
            }
        }

        public void AddShow(Shows show)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Books (Title, Order, Watched, SeriesId, SeasonID, PlatformId)
                    OUTPUT INSERTED.ID
                    VALUES (@Title, @Order, @Read, @SeriesId, @SeasonId, @PlatformId);";

                    DbUtils.AddParameter(cmd, "@Title", show.Title);
                    DbUtils.AddParameter(cmd, "@Order", show.Order);
                    DbUtils.AddParameter(cmd, "@Watched", show.Watched);
                    DbUtils.AddParameter(cmd, "@SeriesId", show.SeriesId);
                    DbUtils.AddParameter(cmd, "@SeasonId", show.SeasonId);
                    DbUtils.AddParameter(cmd, "@PlatformId", show.PlatformId);

                    int id = (int)cmd.ExecuteScalar();

                    show.Id = id;
                }
            }
        }

        public void UpdateShow(Shows show)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Shows
                            SET Title = @Title
                                Order = @Order
                                Watched = @Watched
                                SeriesId = @SeriesId
                                SeasonId = @SeasonId
                                PlatformId = @PlatformId
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", show.Title);
                    DbUtils.AddParameter(cmd, "@Order", show.Order);
                    DbUtils.AddParameter(cmd, "@Watched", show.Watched);
                    DbUtils.AddParameter(cmd, "@SeriesId", show.SeriesId);
                    DbUtils.AddParameter(cmd, "@SeasonId", show.SeasonId);
                    DbUtils.AddParameter(cmd, "@PlatformId", show.PlatformId);
                    DbUtils.AddParameter(cmd, "@Id", show.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteShow(int showId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Shows
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", showId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Shows ShowsFromReader(SqlDataReader reader)
        {
            return new Shows()
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
                SeasonId = reader.GetInt32(reader.GetOrdinal("SeasonId")),
                Season = new Season()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("SeriesId")),
                    Number = reader.GetInt32(reader.GetOrdinal("SeasonNumber")),
                    Episode = reader.GetInt32(reader.GetOrdinal("Episode"))
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
