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

namespace Application.Features.Tables.Commands.UpdateTable
{
    public class UpdateTableCommand : IRequest<Response<int>>
    {
        public int TableId { get; set; }
        public string TableState { get; set; }

        public class UpdateTableCommandHandler : IRequestHandler<UpdateTableCommand, Response<int>>
        {
            private readonly ITableRepositoryAsync _tableRepository;
            private readonly IMapper _mapper;
            public UpdateTableCommandHandler(ITableRepositoryAsync tableRepository, IMapper mapper)
            {
                _tableRepository = tableRepository;
                _mapper = mapper;
            }
            public async Task<Response<int>> Handle(UpdateTableCommand command, CancellationToken cancellationToken)
            {
                var table = await _tableRepository.GetByIdAsync(command.TableId);

                if (table == null)
                {
                    throw new ApiException($"Table Not Found.");
                }
                else
                {
                    

                    table = _mapper.Map<Table>(command);
                    await _tableRepository.UpdateAsync(table);
                    return new Response<int>(table.Id);
                }
            }
        }
    }
}
