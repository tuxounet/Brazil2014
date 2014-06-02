using C2S.Brazil2014.Services.BOM.Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities
{
    public partial class Team
    {

        public TeamInGroup ToTeamInGroup()
        {
            return new TeamInGroup()
            {
                Id = this.IdFIFA,
                Name = this.Libelle,
                Group = this.Group
            };

        }

    }
}
