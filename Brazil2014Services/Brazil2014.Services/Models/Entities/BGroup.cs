using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.Entities
{
    public class BGroup
    {
        public int ID { get; set; }
        public string Libelle { get; set; }

        public static BGroup FromEntity(Group p_entity)
        {
            return new BGroup()
            {
                ID = p_entity.ID,
                Libelle = p_entity.Libelle
            };
        }

    }
}