using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.Orders.Commands.CreateOrder;
using Application.Features.Orders.Commands.DeleteOrderById;
using Application.Features.Orders.Commands.UpdateOrder;
using Application.Features.Orders.Queries.GetAllOrders;
using Application.Features.Orders.Queries.GetOrderById;
using Application.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class OrderController : BaseApiController
    {
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllOrdersParameter filter)
        {

            return Ok(await Mediator.Send(new GetAllOrdersQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber }));
        }

        // GET api/<controller>/5
        [HttpGet("{OrderId}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetOrderByIdQuery { Id = id }));
        }

        // POST api/<controller>/CreateOrder
        [HttpPost("CreateOrder")]
        //        [Authorize]
        public async Task<IActionResult> Post(CreateOrderCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        // PUT api/<controller>/5
        [HttpPut("UpdateOrder")]
        //[Authorize]
        public async Task<IActionResult> Put(int id, UpdateOrderCommand command)
        {
            if (id != command.TableID)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{OrderId}Delete")]
 //       [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteOrderByIdCommand { Id = id }));
        }
    }
}
