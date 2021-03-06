﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Services.BOM.Entities
{
    [MetadataType(typeof(Videos.UnitModel))]
    public partial class Videos
    {

        public class UnitModel
        {
            [Key]
            public int Id { get; set; }

            [Required]
            [DataType(DataType.Date)]
            public DateTime Date { get; set; }

            [Required]
            [DataType(DataType.Text)]
            public string Title { get; set; }

            [Required]
            [DataType(DataType.Url)]
            public string VideoLink { get; set; }
        }

    }
}
