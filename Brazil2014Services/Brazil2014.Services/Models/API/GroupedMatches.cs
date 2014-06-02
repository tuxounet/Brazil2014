using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.API
{
    public class GroupedMatches<T>
    {
        public DateTime Date { get; set; }
        public IEnumerable<T> Matchs { get; set; }

    }
}