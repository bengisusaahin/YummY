using System;
using System.Collections.Generic;
using System.Text;
using Domain.Common;

namespace Domain.Entities
{
    public class Order: AuditableBaseEntity
    {
        public int TableID { get; set; }
        
        public string OrderContent { get; set; }

        public string OrderState    { get; set; }
        public double OrderPrice { get; set; }
        public int Amount { get; set; }


    }
}
