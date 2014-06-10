using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.Entities
{
    public class BVideo
    {

        public int Id { get; set; }
        public System.DateTime Date { get; set; }
        public string Title { get; set; }
        public string VideoLink { get; set; }
        public string IdFIFA { get; set; }

        public static BVideo FromEntity(Videos p_entity)
        {
            return new BVideo()
            {

            };
        }

    }
}