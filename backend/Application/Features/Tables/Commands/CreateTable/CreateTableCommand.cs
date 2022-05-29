using Application.Interfaces.Repositories;
using Application.Wrappers;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Tables.Commands.CreateTable
{
    public partial class CreateTableCommand : IRequest<Response<int>>
    {
        public int TableId { get; set; }
        public string TableState { get; set; }
    }
    public class CreateTableCommandHandler : IRequestHandler<CreateTableCommand, Response<int>>
    {
        private readonly ITableRepositoryAsync _tableRepository;
        private readonly IMapper _mapper;
        public CreateTableCommandHandler(ITableRepositoryAsync tableRepository, IMapper mapper)
        {
            _tableRepository = tableRepository;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreateTableCommand request, CancellationToken cancellationToken)
        {
            var table = _mapper.Map<Table>(request);
            await _tableRepository.AddAsync(table);
            return new Response<int>(table.Id);
        }
    }
}
