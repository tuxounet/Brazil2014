using C2S.Brazil2014.Services.BOM.Entities;
using C2S.Brazil2014.Services.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace C2S.Brazil2014.Services.Controllers.API
{
    public class StadeController : ApiController
    {

        private BRAZIL2014Entities db = new BRAZIL2014Entities();

        // GET api/News
        public IEnumerable<BStade> GetTeams()
        {
            return db.Stade.OrderBy(p => p.ID).ToArray().Select(p => BStade.FromEntity(p));
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