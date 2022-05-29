using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Orders.Queries.GetAllOrders
{
    public class GetAllOrdersViewModel
    {

        public int TableID { get; set; }

        public string OrderContent { get; set; }

        public string OrderState { get; set; }
        public double OrderPrice { get; set; }
        public int Amount { get; set; }


    }
}
