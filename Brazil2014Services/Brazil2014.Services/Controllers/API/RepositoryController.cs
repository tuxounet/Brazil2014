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
            l_ret.Videos = db.Videos.OrderBy(p => p.Id).ToArray().Select(p => BVideo.FromEntity(p));
            l_ret.News = db.News.OrderBy(p => p.Id).ToArray().Select(p => BNews.FromEntity(p));
            l_ret.Groups = db.Group.OrderBy(p => p.ID).ToArray().Select(p => BGroup.FromEntity(p));

            var gResults = new List<BTeamResultGroup>();
            foreach (var group in db.Group)
            {
                gResults.AddRange(db.Get_TeamResultGroup(group.Libelle).Select(p => BTeamResultGroup.FromEntity(group, p)));
            }
            l_ret.GroupResults = gResults;

            return l_ret;
        }



        public CurrentRepository GetForItem(string entityName)
        {

            var l_ret = new CurrentRepository();

            //Alimentation sélective des données du référentiel
            switch (entityName)
            {
                case "Teams":
                    l_ret.Teams = db.Team.OrderBy(p => p.ID).ToArray().Select(p => BTeam.FromEntity(p));
                    break;

                case "Stades":
                    l_ret.Stades = db.Stade.OrderBy(p => p.ID).ToArray().Select(p => BStade.FromEntity(p));
                    break;
                case "Matchs":
                    l_ret.Matchs = db.Match.OrderBy(p => p.ID).ToArray().Select(p => BMatch.FromEntity(p));
                    break;
                case "MatchTypes":
                    l_ret.MatchTypes = db.MatchType.OrderBy(p => p.ID).ToArray().Select(p => BMatchType.FromEntity(p));
                    break;
                case "Videos":
                    l_ret.Videos = db.Videos.OrderBy(p => p.Id).ToArray().Select(p => BVideo.FromEntity(p));
                    break;
                case "News":
                    l_ret.News = db.News.OrderBy(p => p.Id).ToArray().Select(p => BNews.FromEntity(p));
                    break;

                case "Groups":
                    l_ret.Groups = db.Group.OrderBy(p => p.ID).ToArray().Select(p => BGroup.FromEntity(p));
                    break;
                case "GroupResults":
                    var gResults = new List<BTeamResultGroup>();
                    foreach (var group in db.Group)
                    {
                        gResults.AddRange(db.Get_TeamResultGroup(group.Libelle).Select(p => BTeamResultGroup.FromEntity(group, p)));
                    }
                    l_ret.GroupResults = gResults;
                    break;

            }

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
