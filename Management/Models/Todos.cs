using System;
namespace React_front_end.Models
{
	public class Todos
	{
		public int Id { get; set; }
		//TODO insert and userid
		public string tittle { get; set; }

		public string description { get; set; }

		public bool completed { get; set; } = false;
	}
}

