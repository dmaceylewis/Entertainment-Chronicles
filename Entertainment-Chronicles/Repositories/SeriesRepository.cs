﻿using Azure;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Microsoft.Extensions.Hosting;

namespace Entertainment_Chronicles.Repositories
{
    public class SeriesRepository : BaseRepository, ISeriesRepository
    {
        public SeriesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Series> GetAllSeries()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.[Name] AS SeriesName, s.CollectionId, c.[Name] AS CollectionName 
                        FROM Series s
                        LEFT JOIN Collections c ON s.CollectionId = c.Id
                        ORDER BY s.[Name] ASC";

                    var reader = cmd.ExecuteReader();
                    var series = new List<Series>();

                    while (reader.Read())
                    {
                        series.Add(new Series()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "SeriesName"),
                            CollectionId = DbUtils.GetInt(reader, "CollectionId"),
                            Collections = new Collections()
                            {
                                Id = DbUtils.GetInt(reader, "CollectionId"),
                                Name = DbUtils.GetString(reader, "CollectionName")
                            }
                        });
                    }
                    reader.Close();

                    return series;
                }
            }
        }

        public Series GetSeriesById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.[Name] AS SeriesName, s.CollectionId, c.[Name] AS CollectionName 
                        FROM Series s
                        LEFT JOIN Collections c ON s.CollectionId = c.Id
                        WHERE s.Id = @Id
                        ORDER BY s.[Name] ASC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Series series = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        series = new Series()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "SeriesName"),
                            CollectionId = DbUtils.GetInt(reader, "CollectionId"),
                            Collections = new Collections()
                            {
                                Id = DbUtils.GetInt(reader, "CollectionId"),
                                Name = DbUtils.GetString(reader, "CollectionName")
                            }
                        };
                    }
                    reader.Close();

                    return series;
                }
            }
        }

        public void AddSeries(Series series)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Series (Name, CollectionId)
                    OUTPUT INSERTED.ID
                    VALUES (@Name, @CollectionId);";

                    DbUtils.AddParameter(cmd, "@Name", series.Name);
                    DbUtils.AddParameter(cmd, "@CollectionId", series.CollectionId);

                    int id = (int)cmd.ExecuteScalar();

                    series.Id = id;
                }
            }
        }

        public void UpdateSeries(Series series)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Series
                            SET [Name] = @Name
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", series.Name);
                    DbUtils.AddParameter(cmd, "@Id", series.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteSeries(int seriesId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Series
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", seriesId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
