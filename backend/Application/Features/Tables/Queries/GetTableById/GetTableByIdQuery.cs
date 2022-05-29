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

namespace Application.Features.Tables.Queries.GetTableById
{
    public class GetTableByIdQuery : IRequest<Response<Table>>
    {
        public int Id { get; set; }
        public class GetTableByIdQueryHandler : IRequestHandler<GetTableByIdQuery, Response<Table>>
        {
            private readonly ITableRepositoryAsync _tableRepository;
            public GetTableByIdQueryHandler(ITableRepositoryAsync tableRepository)
            {
                _tableRepository = tableRepository;
            }
            public async Task<Response<Table>> Handle(GetTableByIdQuery query, CancellationToken cancellationToken)
            {
                var table = await _tableRepository.GetByIdAsync(query.Id);
                if (table == null) throw new ApiException($"table Not Found.");
                return new Response<Table>(table);
            }
        }
    }
}
