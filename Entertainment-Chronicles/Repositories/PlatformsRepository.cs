using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class PlatformsRepository : BaseRepository, IPlatformsRepository
    {
        public PlatformsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Platforms> GetAllPlatforms()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name] AS PlatformName
                        FROM Platforms";

                    var reader = cmd.ExecuteReader();
                    var platforms = new List<Platforms>();

                    while (reader.Read())
                    {
                        platforms.Add(new Platforms()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "PlatformName")
                        });
                    }
                    reader.Close();

                    return platforms;
                }
            }
        }

        public Platforms GetPlatformById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name] AS PlatformName 
                        FROM Platforms
                        WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Platforms platform = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        platform = new Platforms()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "PlatformName")
                        };
                    }
                    reader.Close();

                    return platform;
                }
            }
        }

        public void AddPlatform(Platforms platform)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Platforms (Name)
                    OUTPUT INSERTED.ID
                    VALUES (@Name);";

                    DbUtils.AddParameter(cmd, "@Name", platform.Name);

                    int id = (int)cmd.ExecuteScalar();

                    platform.Id = id;
                }
            }
        }

        public void UpdatePlatform(Platforms platform)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Platforms
                            SET [Name] = @Name
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", platform.Name);
                    DbUtils.AddParameter(cmd, "@Id", platform.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePlatform(int platformId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Platform
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", platformId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
