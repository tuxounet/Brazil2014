using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.Entities
{


    public class BTeam
    {
        public int ID { get; set; }

        public string Libelle { get; set; }

        public string Group { get; set; }

        public string IdFIFA { get; set; }



        public static BTeam FromEntity(Team p_entity)
        {
            return new BTeam()
            {
                ID = p_entity.ID,
                Libelle = p_entity.Libelle,
                Group = p_entity.Group,
                IdFIFA = p_entity.IdFIFA
            };


        }
    }
}