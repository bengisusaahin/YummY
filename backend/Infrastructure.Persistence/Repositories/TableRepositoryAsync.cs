using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Contexts;
using Infrastructure.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class TableRepositoryAsync : GenericRepositoryAsync<Table>, ITableRepositoryAsync
    {
        private readonly DbSet<Table> _tables;

        public TableRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _tables = dbContext.Set<Table>();
        }

       
    }
}
