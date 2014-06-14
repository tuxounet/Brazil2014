using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace C2S.Brazil2014.Services.Models.Entities
{
    public class BMatch
    {


        public int ID { get; set; }
        public int Team1 { get; set; }
        public string Team1Name { get; set; }
        public int Team2 { get; set; }
        public string Team2Name { get; set; }
        public Nullable<int> Team1Goal { get; set; }
        public Nullable<int> Team2Goal { get; set; }
        public bool IsExtraTime { get; set; }
        public Nullable<int> Team1Penalty { get; set; }
        public Nullable<int> Team2Penalty { get; set; }
        public System.DateTime Date { get; set; }
        public int MatchTypeId { get; set; }
        public int StadeId { get; set; }
        public Nullable<int> Rank { get; set; }
        public Nullable<System.TimeSpan> Hour { get; set; }
        public string MatchTime { get; set; }
        public Nullable<int> IdFIFA { get; set; }
        public string Team1GoalsBy { get; set; }
        public string Team2GoalsBy { get; set; }



        public static BMatch FromEntity(Match p_entity)
        {
            return new BMatch()
            {
                ID = p_entity.ID,
                Team1 = p_entity.Team1,
                Team1Name = p_entity.Team.Libelle,
                Team1Goal = p_entity.Team1Goal,
                Team1GoalsBy = p_entity.Team1GoalsBy,
                Team1Penalty = p_entity.Team1Penalty,
                Team2 = p_entity.Team2,
                Team2Name = p_entity.Team3.Libelle,
                Team2Goal = p_entity.Team2Goal,
                Team2GoalsBy = p_entity.Team1GoalsBy,
                Team2Penalty = p_entity.Team1Penalty,
                Date = p_entity.Date,
                IsExtraTime = p_entity.IsExtraTime,
                MatchTypeId = p_entity.MatchTypeId,
                StadeId = p_entity.StadeId,
                IdFIFA = p_entity.IdFIFA,
                Hour = p_entity.Hour,
                Rank = p_entity.Rank,
                MatchTime = p_entity.MatchTime
            };
        }
    }
}
