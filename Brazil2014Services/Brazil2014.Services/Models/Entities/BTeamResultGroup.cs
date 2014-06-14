using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.Entities
{
    public class BTeamResultGroup
    {

        public Nullable<int> BC { get; set; }
        public Nullable<int> BP { get; set; }
        public Nullable<int> G { get; set; }
        public string Id { get; set; }
        public string Libelle { get; set; }
        public Nullable<int> N { get; set; }
        public Nullable<int> P { get; set; }
        public Nullable<int> PTS { get; set; }

        public string GroupName { get; set;  }
        public int Group { get; set;  }

        public static BTeamResultGroup FromEntity(Group p_group,  Get_TeamResultGroup_Result p_entity)
        {
            return new BTeamResultGroup()
            {
                Id = p_entity.Id,
                Libelle = p_entity.libelle,
                Group = p_group.ID,
                GroupName = p_group.Libelle,
                BC = p_entity.BC,
                BP = p_entity.BP,
                G = p_entity.G,
                N = p_entity.N,
                P = p_entity.P,
                PTS = p_entity.PTS
            };
        }

    }
}