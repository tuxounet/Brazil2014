using C2S.Brazil2014.Services.BOM.Entities;
using Common.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace C2S.Brazil2014.Fetcher.Jobs
{
    public class FetchNews : IJob
    {

        private static ILog log = LogManager.GetLogger<FetchMatch>();

        public void Execute(IJobExecutionContext context)
        {

            try
            {


                var r = XmlReader.Create("http://fr.fifa.com/worldcup/news/rss.xml");
                var albums = SyndicationFeed.Load(r);
                r.Close();

                if (!albums.Items.Any()) return;


                using (var db = new C2S.Brazil2014.Services.BOM.Entities.BRAZIL2014Entities())
                {


                    foreach (SyndicationItem album in albums.Items)
                    {
                        var idFifa = album.Links.First().Uri.ToString();

                        if (db.News.Any(p => p.IdFIFA.Equals(idFifa, StringComparison.InvariantCultureIgnoreCase) == true))
                        {
                            //La vidéo 
                            log.Warn("La news existe déja");
                            continue;
                        }

                        log.Info("Nouvelle news !");

                        var news = new News();
                        news.Id = Guid.NewGuid();
                        news.Title = album.Summary.Text.Replace("\"", "&quot");
                        news.Summary = album.Summary.Text.Replace("\"", "&quot");
                        news.Date = album.PublishDate.DateTime;
                        var link = album.Links.FirstOrDefault(p => p.RelationshipType == "enclosure");
                        if (link != null)
                        {
                            news.ThumbUrl = album.Links.FirstOrDefault(p => p.RelationshipType == "enclosure").Uri.ToString();
                        }
                        else
                        {
                            news.ThumbUrl = null;
                        }
                        news.IdFIFA = idFifa;
                        news.Content = idFifa;
                        db.News.Add(news);

                        db.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }





    }
}
