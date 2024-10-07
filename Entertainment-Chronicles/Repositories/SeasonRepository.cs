using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class SeasonRepository : BaseRepository, ISeasonRepository
    {
        public SeasonRepository(IConfiguration configuration) : base(configuration) { }

        public List<Season> GetAllSeasons()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Number] AS SeasonNumber, Episode 
                        FROM Season
                        ORDER BY [Number] ASC";

                    var reader = cmd.ExecuteReader();
                    var seasons = new List<Season>();

                    while (reader.Read())
                    {
                        seasons.Add(new Season()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Number = reader.GetInt32(reader.GetOrdinal("SeasonNumber")),
                            Episode = reader.GetInt32(reader.GetOrdinal("Episode"))
                        });
                    }
                    reader.Close();

                    return seasons;
                }
            }
        }

        public Season GetSeasonById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Number] AS SeasonNumber, Episode 
                        FROM Season
                        WHERE up.Id = @Id
                        ORDER BY [Number] ASC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Season season = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        season = new Season()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Number = reader.GetInt32(reader.GetOrdinal("SeasonNumber")),
                            Episode = reader.GetInt32(reader.GetOrdinal("Episode"))
                        };
                    }
                    reader.Close();

                    return season;
                }
            }
        }

        public void AddSeason(Season season)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Season (Number, Episode )
                    OUTPUT INSERTED.ID
                    VALUES (@Number, @UserId);";

                    DbUtils.AddParameter(cmd, "@Number", season.Number);
                    DbUtils.AddParameter(cmd, "@Episode", season.Episode);

                    int id = (int)cmd.ExecuteScalar();

                    season.Id = id;
                }
            }
        }

        public void UpdateSeason(Season season)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Season
                            SET [Number] = @Number
                                Episode - @Episode
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Number", season.Number);
                    DbUtils.AddParameter(cmd, "@Episode", season.Episode);
                    DbUtils.AddParameter(cmd, "@Id", season.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteSeason(int seasonId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Season
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", seasonId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
