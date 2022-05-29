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

namespace Application.Features.Orders.Commands.UpdateOrder
{
    public class UpdateOrderCommand : IRequest<Response<int>>
    {
        public int TableID { get; set; }

        public string OrderContent { get; set; }

        public string OrderState { get; set; }
        public double OrderPrice { get; set; }
        public int Amount { get; set; }

        public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand, Response<int>>
        {
            private readonly IOrderRepositoryAsync _orderRepository;
            private readonly IMapper _mapper;
            public UpdateOrderCommandHandler(IOrderRepositoryAsync orderRepository, IMapper mapper)
            {
                _orderRepository = orderRepository;
                _mapper = mapper;
            }

            public async Task<Response<int>> Handle(UpdateOrderCommand command, CancellationToken cancellationToken)
            {
                var order = await _orderRepository.GetByIdAsync(command.TableID);

                if (order == null)
                {
                    throw new ApiException($"Order Not Found.");
                }
                else
                {
                    

                    order = _mapper.Map<Order>(command);
                    await _orderRepository.UpdateAsync(order);
                    return new Response<int>(order.Id);
                }
            }
        }
    }
}
