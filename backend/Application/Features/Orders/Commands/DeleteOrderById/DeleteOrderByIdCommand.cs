using Application.Exceptions;
using Application.Interfaces.Repositories;
using Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Orders.Commands.DeleteOrderById
{
    public class DeleteOrderByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteOrderByIdCommandHandler : IRequestHandler<DeleteOrderByIdCommand, Response<int>>
        {
            private readonly IOrderRepositoryAsync _orderRepository;
            public DeleteOrderByIdCommandHandler(IOrderRepositoryAsync orderRepository)
            {
                _orderRepository = orderRepository;
            }
            public async Task<Response<int>> Handle(DeleteOrderByIdCommand command, CancellationToken cancellationToken)
            {
                var order = await _orderRepository.GetByIdAsync(command.Id);
                if (order == null) throw new ApiException($"Order Not Found.");
                await _orderRepository.DeleteAsync(order);
                return new Response<int>(order.Id);
            }
        }
    }
}
