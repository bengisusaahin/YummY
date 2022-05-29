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

namespace Application.Features.Tables.Queries.GetAllTables
{
    public class GetAllTablesQuery : IRequest<PagedResponse<IEnumerable<GetAllTablesViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class GetAllTablesQueryHandler : IRequestHandler<GetAllTablesQuery, PagedResponse<IEnumerable<GetAllTablesViewModel>>>
    {
        private readonly ITableRepositoryAsync _tableRepository;
        private readonly IMapper _mapper;
        public GetAllTablesQueryHandler(ITableRepositoryAsync tableRepository, IMapper mapper)
        {
            _tableRepository = tableRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllTablesViewModel>>> Handle(GetAllTablesQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetAllTablesParameter>(request);
            var table = await _tableRepository.GetPagedReponseAsync(validFilter.PageNumber,validFilter.PageSize);
            var tableViewModel = _mapper.Map<IEnumerable<GetAllTablesViewModel>>(table);
            return new PagedResponse<IEnumerable<GetAllTablesViewModel>>(tableViewModel, validFilter.PageNumber, validFilter.PageSize);           
        }
    }
}
