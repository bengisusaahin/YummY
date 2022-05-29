using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IUserRepositoryAsync : IGenericRepositoryAsync<User>
    {
        public Task<IReadOnlyList<User>> GetUserWithRelationsAsync(int pageNumber, int pageSize);
        public Task<User> GetUserByIdWithRelationsAsync(int UserId);
    }
}
