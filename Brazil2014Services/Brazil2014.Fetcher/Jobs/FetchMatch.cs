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

            try
            {
                var matchsDocumentsUrl = "http://fr.fifa.com/worldcup/matches/index.html";
                var doc = new HtmlAgilityPack.HtmlDocument();
                using (var wc = new WebClient())
                {
                    wc.Encoding = System.Text.Encoding.UTF8;
                    doc.LoadHtml(wc.DownloadString(matchsDocumentsUrl));
                }


                //Doc chargé, analyse 
                var matchs = doc.DocumentNode.SelectNodes("//div[@class='mu fixture']");

                using (var db = new C2S.Brazil2014.Services.BOM.Entities.BRAZIL2014Entities())
                {
                    int teamCounter = db.Team.Any() ? db.Team.Max(p => p.ID) + 1 : 1;
                    int stadeCounter = db.Stade.Any() ? db.Stade.Max(p => p.ID) + 1 : 1;
                    int matchCounter = db.Match.Any() ? db.Match.Max(p => p.ID) + 1 : 1;
                    int matchTypeCounter = db.MatchType.Any() ? db.MatchType.Max(p => p.ID) + 1 : 1;
                    int groupCounter = db.Group.Any() ? db.Group.Max(p => p.ID) + 1 : 1;
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
                            log.Warn("L'id n'est pas un id de match compatible (" + s_id + ")");
                            continue;
                        }


                        var l_match = db.Match.FirstOrDefault(p => p.IdFIFA == l_id);
                        if (l_match == null)
                        {
                            log.Info("Nouveau match " + l_id);
                            l_match = new Match();
                            l_match.ID = matchCounter;
                            matchCounter++;
                            l_match.IdFIFA = l_id;
                            l_match.Date = DateTime.Parse(match.SelectSingleNode(".//div[@class='mu-i-date']").InnerText);
                            l_match.Hour = TimeSpan.Parse(match.SelectSingleNode(".//div[@class='mu-i-datetime']").InnerText.Split('-').Last().Trim().Split(' ').First().Trim());

                            //Recherche de l'equipe
                            var l_team1IdFifa = match.SelectSingleNode(".//div[@class='t home']/div/span/img").Attributes["src"].Value.Split('/').Last().Split('.').First().Trim();
                            if (l_team1IdFifa == "void")
                                l_team1IdFifa = match.SelectSingleNode(".//div[@class='t home']/div[@class='t-n']/span").InnerText;

                            var l_team1 = db.Team.FirstOrDefault(p => p.IdFIFA == l_team1IdFifa);
                            if (l_team1 == null)
                            {
                                l_team1 = new Team();
                                l_team1.ID = teamCounter;
                                teamCounter++;
                                l_team1.IdFIFA = l_team1IdFifa;
                                l_team1.Libelle = match.SelectSingleNode(".//div[@class='t home']/div[@class='t-n']/span").InnerText;
                                

                                var group = match.SelectSingleNode(".//div[@class='mu-i-group']").InnerText;
                                if (group.StartsWith("Groupe"))
                                {
                                    l_team1.Group = group.Split(' ').Last().Trim();
                                }
                                else
                                {
                                    l_team1.Group = "?";
                                }

                                db.Team.Add(l_team1);

                            }

                            l_match.Team = l_team1;
                            var l_team2IdFifa = match.SelectSingleNode(".//div[@class='t away']/div/span/img").Attributes["src"].Value.Split('/').Last().Split('.').First().Trim();
                            if (l_team2IdFifa == "void")
                                l_team2IdFifa = match.SelectSingleNode(".//div[@class='t away']/div[@class='t-n']/span").InnerText;

                            var l_team2 = db.Team.FirstOrDefault(p => p.IdFIFA == l_team2IdFifa);
                            if (l_team2 == null)
                            {
                                l_team2 = new Team();
                                l_team2.ID = teamCounter;
                                teamCounter++;
                                l_team2.IdFIFA = l_team2IdFifa;
                                l_team2.Libelle = match.SelectSingleNode(".//div[@class='t away']/div[@class='t-n']/span").InnerText;
                                


                                var group = match.SelectSingleNode(".//div[@class='mu-i-group']").InnerText;
                                if (group.StartsWith("Groupe"))
                                {
                                    l_team2.Group = group.Split(' ').Last().Trim();
                                }
                                else
                                {
                                    l_team2.Group = "?";
                                }

                                db.Team.Add(l_team2);

                            }
                            l_match.Team3 = l_team2;

                            var grp = match.SelectSingleNode(".//div[@class='mu-i-group']").InnerText;
                            if (grp.StartsWith("Groupe"))
                            {
                                var groupName = grp.Split(' ').Last().Trim(); 
                                if(!db.Group.Any(p=>p.Libelle ==  groupName))
                                {
                                    var g = new Group();
                                    g.ID =  groupCounter; 
                                    groupCounter++;
                                    g.Libelle = groupName; 
                                    db.Group.Add(g);
                                }
                            }
                          


                            var typeName = match.SelectSingleNode(".//div[@class='mu-i-group']").InnerText;
                            if (typeName.StartsWith("Groupe"))
                                typeName = "Groupe";
                            var l_type = db.MatchType.FirstOrDefault(p => p.Libelle == typeName);
                            if (l_type == null)
                            {
                                l_type = new MatchType();
                                l_type.ID = matchTypeCounter;
                                matchTypeCounter++;
                                l_type.Libelle = typeName;
                                db.MatchType.Add(l_type);
                            }
                            l_match.MatchType = l_type;



                            var stadiumname = match.SelectSingleNode(".//div[@class='mu-i-stadium']").InnerText;
                            var l_stadium = db.Stade.FirstOrDefault(p => p.Libelle == stadiumname);
                            if (l_stadium == null)
                            {
                                l_stadium = new Stade();
                                l_stadium.ID = stadeCounter;
                                stadeCounter++;
                                l_stadium.Libelle = stadiumname;
                                l_stadium.Capacity = 0;
                                l_stadium.City = "??";
                                db.Stade.Add(l_stadium);

                            }
                            l_match.Stade = l_stadium;

                            db.Match.Add(l_match);
                        }
                        else
                        {
                            log.Info("Edition du match " + l_id);
                            l_match.IdFIFA = l_id;

                        }

                        db.SaveChanges();



                    }


                }

                var i = matchs.Count;
            }
            catch (Exception ex)
            {
                log.Error(ex);

            }





        }
    }
}
