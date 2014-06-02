using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.API
{
    public class GroupDetail
    {

        public string GroupName { get; set;  }



        

        public List<BOM.Entities.Get_TeamResultGroup_Result> Results { get; set; }

        public List<BOM.Entities.ViewModels.CalendarMatch> Matches { get; set; }
    }
}