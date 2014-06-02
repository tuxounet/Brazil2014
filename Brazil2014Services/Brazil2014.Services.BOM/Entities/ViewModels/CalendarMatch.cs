using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities.ViewModels
{
    public class CalendarMatch
    {
        public string Team1Name;

        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string Time { get; set; }

        public string Team1 { get; set; }

        public string Team2 { get; set; }

        public string Team2Name { get; set; }

        public int Stadium { get; set; }

        public string StadiumName { get; set; }

        public string GroupName { get; set; }

        public string Type { get; set; }

        public TimeSpan? Hour { get; set; }
    }
}
