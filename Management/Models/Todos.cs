using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_front_end.Models
{
	public class Todos
	{
		public int Id { get; set; }
		[Required]
		public string tittle { get; set; }
        [Required]

        public string description { get; set; }
        [Required]

        public bool completed { get; set; } = false;

		[ForeignKey("Users")]
		public int userId { get; set; }

		public Users user { get; set; }
	}
}

