using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Generic;

namespace React_front_end.Endpoints
{
	public static class UsersApi
	{
        public static void ConfigureUsers(this WebApplication app)
        {
            app.MapPost("/users", Insert);
            app.MapGet("/users", Get);
            app.MapPut("/users/{id}", UpdateUsers);
            app.MapDelete("/users/{id}", Delete);
            //app.MapGet("/authors/{id}", GetAuthor);
        }

        private static Task Delete(HttpContext context)
        {
            throw new NotImplementedException();
        }

        private static Task UpdateUsers(HttpContext context)
        {
            throw new NotImplementedException();
        }

        private static Task Get(HttpContext context)
        {
            throw new NotImplementedException();
        }

        private static Task Insert(HttpContext context)
        {
            throw new NotImplementedException();
        }
    }
}

