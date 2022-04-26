using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    class Department
    {
        public string Name { get; set; }
        public int? ParentDepartmentId { get; set; }
    }
}
