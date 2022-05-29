using Application.Exceptions;
using Application.Interfaces.Repositories;
using Application.Wrappers;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<Response<User>>
    {
        public int Id { get; set; }
        public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Response<User>>
        {
            private readonly IUserRepositoryAsync _userRepository;
            public GetUserByIdQueryHandler(IUserRepositoryAsync userRepository)
            {
                _userRepository = userRepository;
            }
            public async Task<Response<User>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(query.Id);
                if (user == null) throw new ApiException($"User Not Found.");
                return new Response<User>(user);
            }
        }
    }
}
