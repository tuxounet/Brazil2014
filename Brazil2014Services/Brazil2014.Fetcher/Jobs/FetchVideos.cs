using C2S.Brazil2014.Services.BOM.Entities;
using Common.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace C2S.Brazil2014.Fetcher.Jobs
{
    public class FetchVideos : IJob
    {

        private static ILog log = LogManager.GetLogger<FetchVideos>();

        public void Execute(IJobExecutionContext context)
        {
            try
            {


                var r = XmlReader.Create("https://gdata.youtube.com/feeds/api/playlists/PLw6_k1B5dz6AxiiSl4g61CKzD1KI_vdFZ?v=2");
                var albums = SyndicationFeed.Load(r);
                r.Close();

                if (!albums.Items.Any()) return;


                using (var db = new C2S.Brazil2014.Services.BOM.Entities.BRAZIL2014Entities())
                {

                    int counter = db.Videos.Any() ? db.Videos.Max(p => p.Id) + 1 : 1;
                    foreach (SyndicationItem album in albums.Items)
                    {
                        var idFifa = album.Id;
                        
                        if (db.Videos.Any(p => p.IdFIFA.Equals(idFifa, StringComparison.InvariantCultureIgnoreCase) == true))
                        {
                            //La vidéo 
                            log.Warn("La vidéo existe déja");
                            continue;
                        }

                        log.Info("Nouvelle vidéo !");


                        var video = new Videos();
                        video.Id = counter;
                        counter++;
                        video.Title = album.Title.Text;
                        video.Date = album.PublishDate.DateTime;


                        var embedId = (album.Content as UrlSyndicationContent).Url.ToString().Split('?').First().Split('/').Last().Trim();
                        var playlistId = album.Id.Split(':')[3];
                        //var embedId = idFifa.Split(':').Last().Trim();
                        video.VideoLink = "http://www.youtube.com/embed/" + embedId + "?list="+  playlistId;
                        video.ThumbLink = "https://i1.ytimg.com/vi/" + embedId + "/default.jpg";
                        video.IdFIFA = idFifa;
                      
                        db.Videos.Add(video);

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
