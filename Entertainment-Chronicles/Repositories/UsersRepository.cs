using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Data.SqlClient;
using Entertainment_Chronicles.Models;
using Entertainment_Chronicles.Utils;
using Azure;

namespace Entertainment_Chronicles.Repositories
{
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(IConfiguration configuration) : base(configuration) { }

        public List<Users> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email FROM Users";

                    var reader = cmd.ExecuteReader();
                    var users = new List<Users>();

                    while (reader.Read())
                    {
                        users.Add(new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email")
                        });
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public Users GetUserByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email FROM Users
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    Users user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public Users GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email FROM Users
                         WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Users user = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void AddUser(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (Name, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name,  @Email)";
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
