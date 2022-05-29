using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.Tables.Commands.CreateTable;
using Application.Features.Tables.Commands.DeleteTableById;
using Application.Features.Tables.Commands.UpdateTable;
using Application.Features.Tables.Queries.GetAllTables;
using Application.Features.Tables.Queries.GetTableById;
using Application.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class TableController : BaseApiController
    {
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllTablesParameter filter)
        {

            return Ok(await Mediator.Send(new GetAllTablesQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber }));
        }

        // GET api/<controller>/5
        [HttpGet("{TableId}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetTableByIdQuery { Id = id }));
        }

        // POST api/<controller>/CreateTable
        [HttpPost("CreateTable")]
        //        [Authorize]
        public async Task<IActionResult> Post(CreateTableCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        // PUT api/<controller>/5
        [HttpPut("UpdateTable")]
        //[Authorize]
        public async Task<IActionResult> Put(int id, UpdateTableCommand command)
        {
            if (id != command.TableId)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{TableId}Delete")]
        //       [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteTableByIdCommand { Id = id }));
        }
    }
}
