using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using React_front_end.Data;

namespace React_front_end.Repository
{
    public class UsersRepo<T> : IUsersRepo<T> where T : class
    {
        private DatabaseContext _db;
        public DbSet<T> _table = null;

        public DbSet<T> Table => throw new NotImplementedException();

        public UsersRepo(DatabaseContext db)
        {
            _db = db;
            _table = _db.Set<T>();
        }

        public void Delete(object id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetAll(params Expression<Func<T, object>>[] includeExpressions)
        {
            throw new NotImplementedException();
        }

        public T GetById(object id)
        {
            throw new NotImplementedException();
        }

        public void Insert(T obj)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void Update(T obj)
        {
            throw new NotImplementedException();
        }
    }
}

