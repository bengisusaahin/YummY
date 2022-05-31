using Application.Exceptions;
using Application.Interfaces.Repositories;
using Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;

namespace Application.Features.Tables.Commands.DeleteTableById
{
    public class DeleteTableByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteTableByIdCommandHandler : IRequestHandler<DeleteTableByIdCommand, Response<int>>
        {
            private readonly ITableRepositoryAsync _tableRepository;
            private readonly IMapper _mapper;
            public DeleteTableByIdCommandHandler(ITableRepositoryAsync tableRepository,IMapper mapper)
            {
                _tableRepository = tableRepository;
                _mapper = mapper;
                
        }
            public async Task<Response<int>> Handle(DeleteTableByIdCommand request, CancellationToken cancellationToken)
            {
                var table = await _tableRepository.GetByIdAsync(request.Id);
                if (table == null) throw new ApiException($"Table Not Found.");
                await _tableRepository.DeleteAsync(table);
                return new Response<int>(table.Id);
            }
        }
    }
}
