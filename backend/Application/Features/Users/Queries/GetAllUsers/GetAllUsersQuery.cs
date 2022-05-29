using Application.Filters;
using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Users.Queries.GetAllUsers
{
    public class GetAllUsersQuery : IRequest<PagedResponse<IEnumerable<GetAllUsersViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, PagedResponse<IEnumerable<GetAllUsersViewModel>>>
    {
        private readonly IUserRepositoryAsync _userRepository;
        private readonly IMapper _mapper;
        public GetAllUsersQueryHandler(IUserRepositoryAsync userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllUsersViewModel>>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetAllUsersParameter>(request);
            var user = await _userRepository.GetPagedReponseAsync(validFilter.PageNumber,validFilter.PageSize);
            var userViewModel = _mapper.Map<IEnumerable<GetAllUsersViewModel>>(user);
            return new PagedResponse<IEnumerable<GetAllUsersViewModel>>(userViewModel, validFilter.PageNumber, validFilter.PageSize);           
        }
    }
}
