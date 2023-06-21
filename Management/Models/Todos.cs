using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_front_end.Models
{
	public class Todos
	{
		public int Id { get; set; }
		public string tittle { get; set; }
        

        public string description { get; set; }
        

        public bool completed { get; set; } = false;

        [ForeignKey("Users")]
        public int userId { get; set; }
        public Users user { get; set; }
    }
}

