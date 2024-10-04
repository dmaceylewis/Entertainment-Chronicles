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




    }
}
