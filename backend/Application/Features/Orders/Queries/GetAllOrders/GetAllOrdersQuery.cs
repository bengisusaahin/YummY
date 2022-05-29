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

namespace Application.Features.Orders.Queries.GetAllOrders
{
    public class GetAllOrdersQuery : IRequest<PagedResponse<IEnumerable<GetAllOrdersViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, PagedResponse<IEnumerable<GetAllOrdersViewModel>>>
    {
        private readonly IOrderRepositoryAsync _orderRepository;
        private readonly IMapper _mapper;
        public GetAllOrdersQueryHandler(IOrderRepositoryAsync orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllOrdersViewModel>>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetAllOrdersParameter>(request);
            var order = await _orderRepository.GetPagedReponseAsync(validFilter.PageNumber,validFilter.PageSize);
            var orderViewModel = _mapper.Map<IEnumerable<GetAllOrdersViewModel>>(order);
            return new PagedResponse<IEnumerable<GetAllOrdersViewModel>>(orderViewModel, validFilter.PageNumber, validFilter.PageSize);           
        }
    }
}
