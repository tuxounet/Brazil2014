using C2S.Brazil2014.Services.BOM.Entities;
using C2S.Brazil2014.Services.Models.API;
using C2S.Brazil2014.Services.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace C2S.Brazil2014.Services.Controllers.API
{
    public class RepositoryController : ApiController
    {

        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/News
        public CurrentRepository GetCurrentRepository()
        {
            var l_ret = new CurrentRepository();

            //Alimentation des données du référentiel
            l_ret.Teams = db.Team.OrderBy(p => p.ID).ToArray().Select(p => BTeam.FromEntity(p));
            l_ret.Stades = db.Stade.OrderBy(p => p.ID).ToArray().Select(p => BStade.FromEntity(p));
            l_ret.Matchs = db.Match.OrderBy(p => p.ID).ToArray().Select(p => BMatch.FromEntity(p));
            l_ret.MatchTypes = db.MatchType.OrderBy(p => p.ID).ToArray().Select(p => BMatchType.FromEntity(p));

            return l_ret;
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
