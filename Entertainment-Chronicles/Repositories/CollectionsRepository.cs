using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class CollectionsRepository : BaseRepository, ICollectionsRepository
    {
        public CollectionsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Collections> GetAllCollections()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.[Name] AS CollectionName, c.UserId, u.[Name] AS UserName 
                        FROM Collections c
                        LEFT JOIN Users u ON c.UserId = u.Id
                        ORDER BY c.[Name] ASC";

                    var reader = cmd.ExecuteReader();
                    var collections = new List<Collections>();

                    while (reader.Read())
                    {
                        collections.Add(new Collections()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "CollectionName"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Users = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "UserName")
                            }
                        });
                    }
                    reader.Close();

                    return collections;
                }
            }
        }

        public Collections GetCollectionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.[Name] AS CollectionName, c.UserId, u.[Name] AS UserName 
                        FROM Collections c
                        LEFT JOIN Users u ON c.UserId = u.Id
                        WHERE c.Id = @Id
                        ORDER BY c.[Name] ASC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Collections collection = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        collection = new Collections()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "CollectionName"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Users = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "UserName")
                            }
                        };
                    }
                    reader.Close();

                    return collection;
                }
            }
        }

        public void AddCollection(Collections collection)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Collections (Name, UserId)
                    OUTPUT INSERTED.ID
                    VALUES (@Name, @UserId);";

                    DbUtils.AddParameter(cmd, "@Name", collection.Name);
                    DbUtils.AddParameter(cmd, "@UserId", collection.UserId);

                    collection.Id = (int)cmd.ExecuteScalar();

                    //collection.Id = id;
                }
            }
        }

        public void UpdateCollection(Collections collection)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Collections
                            SET [Name] = @Name
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", collection.Name);
                    DbUtils.AddParameter(cmd, "@Id", collection.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCollection(int collectionId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    // First delete any related books from the series
                    cmd.CommandText = @"
                            DELETE FROM Books 
                            WHERE SeriesId IN (SELECT Id FROM Series WHERE CollectionId = @SeriesCollectionId)";
                    DbUtils.AddParameter(cmd, "@SeriesCollectionId", collectionId);
                    cmd.ExecuteNonQuery();

                    // Second, delete any related movies from the series
                    cmd.CommandText = @"
                            DELETE FROM Movies 
                            WHERE SeriesId IN (SELECT Id FROM Series WHERE CollectionId = @SeriesCollectionId)";
                    cmd.ExecuteNonQuery();

                    // Third, delete any related shows from the series
                    cmd.CommandText = @"
                            DELETE FROM Shows 
                            WHERE SeriesId IN (SELECT Id FROM Series WHERE CollectionId = @SeriesCollectionId)";
                    cmd.ExecuteNonQuery();

                    // Next, delete any related series
                    cmd.CommandText = @"
                            DELETE FROM Series 
                            WHERE CollectionId = @SeriesCollectionId";
                    cmd.ExecuteNonQuery();

                    // Finally, delete the collection itself
                    cmd.CommandText = @"
                            DELETE FROM Collections
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", collectionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
