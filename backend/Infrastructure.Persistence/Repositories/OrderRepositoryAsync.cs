using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Persistence.Contexts;
using Infrastructure.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Infrastructure.Persistence.Repositories
{
    public class OrderRepositoryAsync : GenericRepositoryAsync<Order>, IOrderRepositoryAsync
    {
        private readonly DbSet<Order> _orders;

        public OrderRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _orders= dbContext.Set<Order>();
        }

        public async Task<Order> GetOrderByIdWithRelationsAsync(int TableID)
        {
            return await _orders.SingleOrDefaultAsync(x => x.TableID == TableID);
        }

       
    }
}
