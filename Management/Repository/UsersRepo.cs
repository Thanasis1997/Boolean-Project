using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using React_front_end.Data;
using React_front_end.Models;

namespace React_front_end.Repository
{
    public class UsersRepo<T> : IUsersRepo<T> where T : class
    {
        private DatabaseContext _db;
        public DbSet<T> _table = null;


        public UsersRepo(DatabaseContext db)
        {
            _db = db;
            _table = _db.Set<T>();
        }

        public void Delete(object id)
        {
            var user = _table.Find(id);
            if (user != null)
            {
                _table.Remove(user);
                Save();
            }
        }

        public IEnumerable<T> GetAll()
        {
            return _table.ToList();
        }

        public IEnumerable<T> GetAll(params Expression<Func<T, object>>[] includeExpressions)
        {
            throw new NotImplementedException();
        }

        public T GetById(object id)
        {
            var user = _table.Find(id);
            return user;
        }

        public T Insert(T obj)
        {
            if (obj != null)
            {
                _table.Add(obj);
                Save();
                return obj;


            }
            return null;


        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public void Update(T obj)
        {
            _table.Attach(obj);
            _db.Entry(obj).State = EntityState.Modified;
            
        }
        public DbSet<T> Table { get { return _table; } }
    }
}

