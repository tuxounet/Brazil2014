using C2S.Brazil2014.Services.BOM.Entities;
using Common.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Fetcher.Jobs
{
    public class FetchMatch : IJob
    {

        private static ILog log = LogManager.GetLogger<FetchMatch>();

        public void Execute(IJobExecutionContext context)
        {
            var matchsDocumentsUrl = "http://fr.fifa.com/worldcup/matches/index.html";
            var doc = new HtmlAgilityPack.HtmlDocument();
            using (var wc = new WebClient())
            {              
                doc.LoadHtml(wc.DownloadString(matchsDocumentsUrl));            
            }


            //Doc chargé, analyse 
            var matchs = doc.DocumentNode.SelectNodes("//div[@class='mu fixture']");

            using (var db = new C2S.Brazil2014.Services.BOM.Entities.BRAZIL2014Entities())
            {
                

                foreach (var match in matchs)
                {
                    var s_id = match.GetAttributeValue("id", null);
                    if (s_id == null)
                    {
                        log.Warn("Impossible de lire l'id du noeud du match");
                        continue;
                    }

                    int l_id = 0;
                    if (!int.TryParse(s_id, out l_id))
                    {
                        log.Warn("L'id n'est pas un id de match compatible (" + s_id  +")");
                        continue;
                    }


                    var l_match = db.Match.FirstOrDefault(p => p.ID == l_id);
                    if (l_match == null)
                    {
                        log.Info("Nouveau match " + l_id);
                        l_match = new Match();
                        l_match.ID = l_id;
                    }

                    //match.SelectSingleNode("//div[@class='(',")

                    //l_match.Date  
                    


                    
                }


            }
            
            var i = matchs.Count;



            throw new NotImplementedException();
        }
    }
}
