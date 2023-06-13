using System;
using System.Text.Json.Serialization;

namespace React_front_end.Models
{
	public class Users
	{
		public int Id { get; set; }

		public string firstName { get; set; }

		public string lastName { get; set; }

		public string email { get; set; }

		public string phone { get; set; }

		[JsonIgnore]
		public bool isAdmin { get; set; }
	}
}

