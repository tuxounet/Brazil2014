﻿using C2S.Brazil2014.Services.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.API
{
    public class CurrentRepository
    {
        public CurrentRepository()
        {
            Date = DateTime.Now;
        }

        public DateTime Date { get; set; }



        #region Données brutes

        public IEnumerable<BTeam> Teams { get; set; }
        public IEnumerable<BStade> Stades { get; set; }
        public IEnumerable<BMatch> Matchs { get; set; }
        public IEnumerable<BMatchType> MatchTypes { get; set; }
        public IEnumerable<BVideo> Videos { get; set; }
        public IEnumerable<BNews> News { get; set; }
        public IEnumerable<BGroup> Groups { get; set; }
        public IEnumerable<BTeamResultGroup> GroupResults { get; set; }

        #endregion




    }
}