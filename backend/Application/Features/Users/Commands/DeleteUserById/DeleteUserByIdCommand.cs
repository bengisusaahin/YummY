using Application.Exceptions;
using Application.Interfaces.Repositories;
using Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Commands.DeleteUserById
{
    public class DeleteUserByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand, Response<int>>
        {
            private readonly IUserRepositoryAsync _userRepository;
            public DeleteUserByIdCommandHandler(IUserRepositoryAsync userRepository)
            {
                _userRepository = userRepository;
            }
            public async Task<Response<int>> Handle(DeleteUserByIdCommand command, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(command.Id);
                if (user == null) throw new ApiException($"User Not Found.");
                await _userRepository.DeleteAsync(user);
                return new Response<int>(user.Id);
            }
        }
    }
}
