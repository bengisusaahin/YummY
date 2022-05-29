
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Application.Interfaces.Repositories;
using Domain.Entities;



namespace Infrastructure.Persistence.Seeds
{
    public class DefaultTables
    {
        public static async Task<bool> SeedAsync(ITableRepositoryAsync tableRepository)
        {

            var defaulttable = new Table
            {
              TableId = 1,
              TableState = "Empty"
                
            };



            var tableList= await tableRepository.GetAllAsync();
            var _defaulttable = tableList.Where(p => p.TableState.StartsWith(defaulttable.TableState)).Count();

            if (_defaulttable > 0) // ALREADY SEEDED
                return true;


            if (_defaulttable == 0)
                try
                {
                    await tableRepository.AddAsync(defaulttable);
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
