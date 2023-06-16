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
            app.MapGet("/users/{id}", GetUser);
        }

        private static async Task<IResult> GetUser(int id, IUsersRepo<Users> repo)
        {
            try
            {
                if (!repo.Table.Any(x => x.Id == id)) return Results.NotFound($"User with id {id} not found");
                return Results.Ok(repo.GetById(id));

            }catch(Exception ex)
            {
                return Results.Problem(ex.Message);

            }
        }

        
        private static async Task<IResult> Delete(int id,IUsersRepo<Users> repo)
        {
            try
            {
                if (!repo.Table.Any(x => x.Id == id)) return Results.NotFound($"User with id {id} not found!");
                repo.Delete(id);
                return Results.Ok($"User with id {id} deleted");

            }catch(Exception ex)
            {
                return Results.Problem(ex.Message);

            }
        }

        private static async Task<IResult> UpdateUsers(int id, Users user, IUsersRepo<Users> repo)
        {
            try
            {
                if (user == null) return Results.NotFound();
                if (!repo.Table.Any(x => x.Id == id)) return Results.NotFound($"The user with id {id} not found");

                var m = repo.GetById(id);
                m.firstName = user.firstName;
                m.email = user.email;
                m.lastName = user.lastName;
                m.password = user.password;
                m.phone = user.phone;
                m.isAdmin = user.isAdmin;
                repo.Update(m);
                repo.Save();
                return Results.Ok(user);


            }catch(Exception ex)
            {
                return Results.Problem(ex.Message);

            }
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

        private static  async Task<IResult> Insert(IUsersRepo<Users> repo, Users user)
        {
            try
            {
                var adddeduser = repo.Insert(user);
                return Results.Ok(adddeduser);
            }
            catch(Exception ex)
            {
                return Results.Problem(ex.Message);

            }
        }
    }
}

