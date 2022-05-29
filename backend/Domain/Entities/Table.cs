using System;
using System.Collections.Generic;
using System.Text;
using Domain.Common;

namespace Domain.Entities
{
    public class Table : AuditableBaseEntity
    {

        public int TableId { get; set; }
        public string TableState { get; set; }


       
        
    }
}
