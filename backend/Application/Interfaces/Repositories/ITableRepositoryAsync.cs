using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface ITableRepositoryAsync : IGenericRepositoryAsync<Table>
    {
        public Task<IReadOnlyList<Table>> GetUserWithRelationsAsync(int pageNumber, int pageSize);
        public Task<Table> GetUserByIdWithRelationsAsync(int TableId);
    }
}
