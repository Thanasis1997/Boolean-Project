using System;
using Microsoft.AspNetCore.Http;
using React_front_end.Models;
using React_front_end.Repository;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Generic;

namespace React_front_end.Endpoints
{
	public static  class TodosApi
	{
        public static void Configuretodos(this WebApplication app)
        {
            app.MapPost("/todos", Insert);
            app.MapGet("/todos", Get);
            app.MapPut("/todos/{id}", UpdateTodos);
            app.MapDelete("/todos/{id}", Delete);
            app.MapGet("/todos/{id}", GetTodo);
        }

        private static async Task<IResult> GetTodo(int id, IUsersRepo<Todos> todosRepo)
        {
            try
            {
                if (!todosRepo.Table.Any(x => x.Id == id))
                    return Results.NotFound($"Todo with id {id} not found");

                return Results.Ok(todosRepo.GetById(id));
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> Delete(int id, IUsersRepo<Todos> todosRepo)
        {
            try
            {
                if (!todosRepo.Table.Any(x => x.Id == id))
                    return Results.NotFound($"Todo with id {id} not found!");

                todosRepo.Delete(id);
                return Results.Ok($"Todo with id {id} deleted");
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> UpdateTodos(int id, Todos todos, IUsersRepo<Todos> todosRepo)
        {
            try
            {
                if (todos == null)
                    return Results.NotFound();

                if (!todosRepo.Table.Any(x => x.Id == id))
                    return Results.NotFound($"The todo with id {id} not found");

                var m = todosRepo.GetById(id);
                m.completed = todos.completed;
                m.description = todos.description;
                m.tittle = todos.tittle;
                todosRepo.Update(m);
                todosRepo.Save();
                return Results.Ok(todos);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> Get(IUsersRepo<Todos> todosRepo)
        {
            try
            {
                return Results.Ok(todosRepo.GetAll());
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        private static async Task<IResult> Insert(IUsersRepo<Todos> todosRepo, Todos todos)
        {
            try
            {
                var addedTodo = todosRepo.Insert(todos);
                return Results.Ok(addedTodo);
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

    }
}

