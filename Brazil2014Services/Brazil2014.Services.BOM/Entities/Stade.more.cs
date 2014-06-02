using C2S.Brazil2014.Services.BOM.Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities
{
    public partial class Stade
    {


        public Stadium ToStadium()
        {
            return new Stadium()
            {
                Id = this.ID,
                Name = this.Libelle,
                City = this.City,
                Capacity = this.Capacity
            };

        }




    }
}
