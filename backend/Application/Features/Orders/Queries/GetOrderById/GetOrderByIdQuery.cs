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

namespace Application.Features.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQuery : IRequest<Response<Order>>
    {
        public int Id { get; set; }
        public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, Response<Order>>
        {
            private readonly IOrderRepositoryAsync _orderRepository;
            public GetOrderByIdQueryHandler(IOrderRepositoryAsync orderRepository)
            {
                _orderRepository = orderRepository;
            }
            public async Task<Response<Order>> Handle(GetOrderByIdQuery query, CancellationToken cancellationToken)
            {
                var order = await _orderRepository.GetByIdAsync(query.Id);
                if (order== null) throw new ApiException($"Order Not Found.");
                return new Response<Order>(order);
            }
        }
    }
}
