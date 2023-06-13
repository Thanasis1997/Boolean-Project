using System;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using React_front_end.Models;

namespace React_front_end.Data
{
	public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
           : base(options)
        {
        }
        private static string GetConnectionString()
        {
            string jsonSettings = File.ReadAllText("appsettings.json");
            JObject configuration = JObject.Parse(jsonSettings);

            return configuration["ConnectionStrings"]["DefaultConnectionString"].ToString();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            //optionsBuilder.UseInMemoryDatabase(databaseName: "Library");            
            optionsBuilder.UseNpgsql(GetConnectionString());


        }

        public DbSet<Users> Users { get; set; }
    }
}

