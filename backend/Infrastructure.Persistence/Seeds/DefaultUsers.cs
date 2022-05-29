
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Application.Interfaces.Repositories;
using Domain.Entities;



namespace Infrastructure.Persistence.Seeds
{
    public class DefaultUsers
    {
        public static async Task<bool> SeedAsync(IUserRepositoryAsync userRepository)
        {

            var defaultuser = new User
            {
                UserId = 1,
                UserNameSurname = "testuser",
                Role = "Waiter",
                Email = "test@hotmail.com",
                EncryptedPassword = "1234."
                
            };



            var userList= await userRepository.GetAllAsync();
            var _defaultuser = userList.Where(p => p.UserNameSurname.StartsWith(defaultuser.UserNameSurname)).Count();

            if (_defaultuser > 0) // ALREADY SEEDED
                return true;


            if (_defaultuser == 0)
                try
                {
                    await userRepository.AddAsync(defaultuser);
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
