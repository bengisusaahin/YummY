using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Users.Queries.GetAllUsers
{
    public class GetAllUsersViewModel
    {

        public int UserId { get; set; }
        public string UserNameSurname { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string EncryptedPassword { get; set; }

    }
}
