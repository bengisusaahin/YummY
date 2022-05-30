using System;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using WebApi;
using Infrastructure.Identity.Models;
using Application.Interfaces;
using Application.Interfaces.Repositories;

namespace IntegrationTests
{
    public class WebTestFixture : WebApplicationFactory<Startup>
    {

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseEnvironment("Testing");

            builder.ConfigureServices(async services =>
            {

                // Add a database context (ApplicationDbContext) using an in-memory
                // database for testing.

                // Build the service provider.
                var sp = services.BuildServiceProvider();
                // Create a scope to obtain a reference to the database
                // context (ApplicationDbContext).
                using (var scope = sp.CreateScope())
                {
                    var services2 = scope.ServiceProvider;
                    try
                    {
                        var userManager = services2.GetRequiredService<UserManager<ApplicationUser>>();
                        var roleManager = services2.GetRequiredService<RoleManager<IdentityRole>>();
                        var accountService = services2.GetRequiredService<IAccountService>();


                        await Infrastructure.Identity.Seeds.DefaultRoles.SeedAsync(userManager, roleManager);
                        await Infrastructure.Identity.Seeds.DefaultSuperAdmin.SeedAsync(userManager, roleManager);
                        await Infrastructure.Identity.Seeds.DefaultBasicUser.SeedAsync(userManager, roleManager);

                        var userRepository = services2.GetRequiredService<IUserRepositoryAsync>();
                        var orderRepository = services2.GetRequiredService<IOrderRepositoryAsync>();
                        var tableRepository = services2.GetRequiredService<ITableRepositoryAsync>();
                      



                        

                    }
                    catch (Exception ex)
                    {
                    }
                }
            });
        }
    }
}