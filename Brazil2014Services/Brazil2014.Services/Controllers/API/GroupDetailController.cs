using C2S.Brazil2014.Services.BOM.Entities;
using C2S.Brazil2014.Services.Models.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace C2S.Brazil2014.Services.Controllers.API
{
    [RoutePrefix("api/GroupDetail")]
    public class GroupDetailController : ApiController
    {

        private BRAZIL2014Entities db = new BRAZIL2014Entities();


        // GET api/<controller>/5
        public GroupDetail Get(string id)
        {
            var detail = new GroupDetail()
            {
                GroupName = id,
                Matches = db.Get_MatchsGroup(id).Select(p=>p.ToCalendarMatch()).ToList(),
                Results = db.Get_TeamResultGroup(id).ToList()
            };

            return detail;
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}