using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using React_front_end.Data;
using React_front_end.Endpoints;
using React_front_end.Models;
using React_front_end.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IUsersRepo<Users>, UsersRepo<Users>>();
builder.Services.AddScoped<IUsersRepo<Todos>, UsersRepo<Todos>>();

builder.Services.AddDbContext<DatabaseContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.Configuretodos();
app.ConfigureUsers();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

