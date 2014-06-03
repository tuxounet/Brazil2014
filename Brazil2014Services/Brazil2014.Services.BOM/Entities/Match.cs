//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace C2S.Brazil2014.Services.BOM.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Match
    {
        public int ID { get; set; }
        public int Team1 { get; set; }
        public int Team2 { get; set; }
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
    
        public virtual Team Team { get; set; }
        public virtual Team Team3 { get; set; }
        public virtual MatchType MatchType { get; set; }
        public virtual Stade Stade { get; set; }
    }
}
