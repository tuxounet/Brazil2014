﻿using C2S.Brazil2014.Services.BOM.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace C2S.Brazil2014.Services.Models.Entities
{
    public class BNews
    {


        public System.Guid Id { get; set; }
        public System.DateTime Date { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string IdFIFA { get; set; }
        public string Summary { get; set; }
        public string ThumbUrl { get; set; }


        public static BNews FromEntity(News p_entity)
        {
            return new BNews()
            {
                Id = p_entity.Id,
                Date = p_entity.Date,
                Content = p_entity.Content,
                Title = p_entity.Title,
                Summary = p_entity.Summary,
                IdFIFA = p_entity.IdFIFA,
                ThumbUrl = p_entity.ThumbUrl
            };
        }


    }
}