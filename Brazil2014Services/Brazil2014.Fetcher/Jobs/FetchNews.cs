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
    public class FetchNews : IJob
    {

        private static ILog log = LogManager.GetLogger<FetchMatch>();

        public void Execute(IJobExecutionContext context)
        {

            try
            {
                var actusDocUrl = "http://m.fifa.com/worldcup/news/all-news.html";
                var doc = new HtmlAgilityPack.HtmlDocument();
                using (var wc = new WebClient())
                {
                    wc.Encoding = System.Text.Encoding.UTF8;
                    doc.LoadHtml(wc.DownloadString(actusDocUrl));
                }

            }
            catch (Exception ex)
            {
                log.Error(ex);

            }





        }
    }
}
