using C2S.Brazil2014.Services.BOM.Entities;
using C2S.Brazil2014.Services.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace C2S.Brazil2014.Services.Controllers.API
{
    public class TeamController : ApiController
    {
        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/News
        public IEnumerable<BTeam> GetTeams()
        {
            return db.Team.OrderBy(p => p.ID).ToArray().Select(p => BTeam.FromEntity(p));
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
