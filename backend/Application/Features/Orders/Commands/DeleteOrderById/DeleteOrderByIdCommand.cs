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

namespace Application.Features.Orders.Commands.DeleteOrderById
{
    public class DeleteOrderByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteOrderByIdCommandHandler : IRequestHandler<DeleteOrderByIdCommand, Response<int>>
        {
            private readonly IOrderRepositoryAsync _orderRepository;
            private readonly IMapper _mapper;
            public DeleteOrderByIdCommandHandler(IOrderRepositoryAsync orderRepository, IMapper mapper)
            {
                _orderRepository = orderRepository;
                _mapper = mapper;
            }
            public async Task<Response<int>> Handle(DeleteOrderByIdCommand request, CancellationToken cancellationToken)
            {
                var order = await _orderRepository.GetByIdAsync(request.Id);
                if (order == null) throw new ApiException($"Order Not Found.");
                await _orderRepository.DeleteAsync(order);
                return new Response<int>(order.Id);
            }
        }
    }
}
