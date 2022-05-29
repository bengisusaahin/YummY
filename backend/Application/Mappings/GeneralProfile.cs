using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

//Orders
using Application.Features.Orders.Queries.GetAllOrders;
using Application.Features.Orders.Queries.GetOrderById;
using Application.Features.Orders.Commands.DeleteOrderById;
using Application.Features.Orders.Commands.CreateOrder;
using Application.Features.Orders.Commands.UpdateOrder;

//Tables
using Application.Features.Tables.Queries.GetAllTables;
using Application.Features.Tables.Queries.GetTableById;
using Application.Features.Tables.Commands.CreateTable;
using Application.Features.Tables.Commands.DeleteTableById;
using Application.Features.Tables.Commands.UpdateTable;

//Users
using Application.Features.Users.Queries.GetAllUsers;
using Application.Features.Users.Queries.GetUserById;
using Application.Features.Users.Commands.CreateUser;
using Application.Features.Users.Commands.DeleteUserById;
using Application.Features.Users.Commands.UpdateUser;




namespace Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<CreateUserCommand, User>();
            CreateMap<User, GetAllUsersViewModel>().ReverseMap();
            CreateMap<UpdateUserCommand, User>();
            CreateMap<GetAllUsersQuery, GetAllUsersParameter>();


            CreateMap<Order, GetAllOrdersViewModel>().ReverseMap();
            CreateMap<CreateOrderCommand, Order>();
            CreateMap<UpdateOrderCommand, Order>();
            CreateMap<GetAllOrdersQuery, GetAllOrdersParameter>();


            CreateMap<Table, GetAllTablesViewModel>().ReverseMap();
            CreateMap<CreateTableCommand, Table>();
            CreateMap<UpdateTableCommand, Table>();
            CreateMap<GetAllTablesQuery, GetAllTablesParameter>();






        }
    }
}
