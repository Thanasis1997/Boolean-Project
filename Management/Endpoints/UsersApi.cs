using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Generic;
using React_front_end.Repository;
using Microsoft.AspNetCore.Http;
using React_front_end.Models;

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
        //TODO create the api
        private static Task Delete(HttpContext context)
        {
            throw new NotImplementedException();
        }

        private static Task UpdateUsers(HttpContext context)
        {
            throw new NotImplementedException();
        }

        private static async Task<IResult> Get(IUsersRepo<Users> repo)
        {
            try
            {
                return Results.Ok(repo.GetAll());

            }catch(Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static Task Insert(HttpContext context)
        {
            throw new NotImplementedException();
        }
    }
}

