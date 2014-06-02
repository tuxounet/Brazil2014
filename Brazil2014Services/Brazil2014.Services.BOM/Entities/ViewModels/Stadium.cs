using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities.ViewModels
{
    public class Stadium
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public int? Capacity { get; set; }
    }
}
