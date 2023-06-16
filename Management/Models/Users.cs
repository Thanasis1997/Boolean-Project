using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace React_front_end.Models
{
	public class Users
	{
		public int Id { get; set; }
		[Required]
		public string firstName { get; set; }
        [Required]
		public string password { get; set; }


        public string lastName { get; set; }
        [Required]

        public string email { get; set; }
        [Required]

        public string phone { get; set; }

	
		public bool isAdmin { get; set; }
	}
}

