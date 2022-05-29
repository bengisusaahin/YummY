
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Application.Interfaces.Repositories;
using Domain.Entities;



namespace Infrastructure.Persistence.Seeds
{
    public class DefaultOrders
    {
        public static async Task<bool> SeedAsync(IOrderRepositoryAsync orderRepository)
        {

            var defaultorder = new Order
            {
                TableID= 1,
                OrderContent ="pizza",
                OrderState = "ready",
                OrderPrice = 30.0,
                Amount = 1



               
            };



            var orderList= await orderRepository.GetAllAsync();
            var _defaultorder = orderList.Where(p => p.OrderContent.StartsWith(defaultorder.OrderContent)).Count();

            if (_defaultorder > 0) // ALREADY SEEDED
                return true;


            if (_defaultorder == 0)
                try
                {
                    await orderRepository.AddAsync(defaultorder);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    throw;
                }



            return false; // NOT ALREADY SEEDED

        }
    }
}
