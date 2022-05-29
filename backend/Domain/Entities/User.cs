using System;
using System.Collections.Generic;
using System.Text;
using Domain.Common;

namespace Domain.Entities
{
    public class User: AuditableBaseEntity
    {

        public int UserId { get; set; }
        public string UserNameSurname { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string EncryptedPassword  { get; set; }

       
        
    }
}
