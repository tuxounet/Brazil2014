using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace C2S.Brazil2014.Services.Models.Entities
{
    public class BStade
    {
        public int ID { get; set; }
        public string Libelle { get; set; }
        public string City { get; set; }
        public int Capacity { get; set; }


        public static BStade FromEntity(Stade p_entity)
        {
            return new BStade()
            {
                ID = p_entity.ID,
                Libelle = p_entity.Libelle,
                City = p_entity.City,
                Capacity = p_entity.Capacity.GetValueOrDefault()
            };
        }
    }
}