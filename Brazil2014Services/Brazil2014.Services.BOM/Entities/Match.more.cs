using C2S.Brazil2014.Services.BOM.Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities
{
    public partial class Match
    {
        public CalendarMatch ToCalendarMatch()
        {
            return new CalendarMatch()
            {
                Id = this.ID,
                Date = this.Date,
                Hour = this.Hour,
                Time = this.MatchTime,
                Team1 = this.Team.IdFIFA,
                Team1Name = this.Team.Libelle,
                Team2 = this.Team3.IdFIFA,
                Team2Name = this.Team3.Libelle,
                Stadium = this.StadeId,
                StadiumName = this.Stade.Libelle,
                Type = this.MatchType.Libelle,
                GroupName = this.Team.Group
            };



        }
    }
}
