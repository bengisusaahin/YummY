using Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Personnel :Person
    {
        public string Avatar { get; set; }
        public virtual ICollection<Education> Educations { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Certificate> Certificates { get; set; }
        public int? EventId { get; set; }

    }
}
