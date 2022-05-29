using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IOrderRepositoryAsync : IGenericRepositoryAsync<Order>
    {
        public Task<IReadOnlyList<Order>> GetUserWithRelationsAsync(int pageNumber, int pageSize);
        public Task<Order> GetUserByIdWithRelationsAsync(int TableId);
    }
}
