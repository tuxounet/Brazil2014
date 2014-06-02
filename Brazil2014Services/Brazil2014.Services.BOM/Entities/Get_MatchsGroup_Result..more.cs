using C2S.Brazil2014.Services.BOM.Entities.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities
{
  public partial  class Get_MatchsGroup_Result
    {

      public CalendarMatch ToCalendarMatch()
      {
          return new CalendarMatch()
          {
              Id = this.Id,
              Date = this.date,
              Hour = this.Hour,
              Time = this.MatchTime,
              Team1 = this.Team1Id,
              Team1Name = this.Team1,
              Team2 = this.Team2Id,
              Team2Name = this.Team2,
              Stadium = this.StadeId,
              StadiumName = this.StadeLibelle,
              Type = this.Type,
              GroupName = this.GroupName
          };



      }

    }
}
