using Application.Exceptions;
using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : IRequest<Response<int>>
    {
        public int UserId { get; set; }
        public string UserNameSurname { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string EncryptedPassword { get; set; }

        public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Response<int>>
        {
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IMapper _mapper;
            public UpdateUserCommandHandler(IUserRepositoryAsync userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }
            public async Task<Response<int>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(command.UserId);

                if (user == null)
                {
                    throw new ApiException($"User Not Found.");
                }
                else
                {
                    

                    user = _mapper.Map<User>(command);
                    await _userRepository.UpdateAsync(user);
                    return new Response<int>(user.Id);
                }
            }
        }
    }
}
