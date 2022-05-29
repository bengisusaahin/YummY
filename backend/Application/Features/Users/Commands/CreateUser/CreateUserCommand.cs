using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Commands.CreateUser
{
    public partial class CreateUserCommand : IRequest<Response<int>>
    {
        public int UserId { get; set; }
        public string UserNameSurname { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string EncryptedPassword { get; set; }
    }
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Response<int>>
    {
        private readonly IUserRepositoryAsync _userRepository;
        private readonly IMapper _mapper;
        public CreateUserCommandHandler(IUserRepositoryAsync userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<User>(request);
            await _userRepository.AddAsync(user);
            return new Response<int>(user.Id);
        }
    }
}
