using MyCouch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MyCouch;
using MyCouch.AspNet.Identity;
namespace C2S.Brazil2014.Services.App_Start
{
    public class IdentityConfig
    {


        public async static void Configure() {
            using (var client = new MyCouchClient(CreateIdentityUri()))
            {
                await client.EnsureDesignDocsExists();
            }
        
        }



        public static Uri CreateIdentityUri()
        {
            return new MyCouchUriBuilder("https://lifelogs.cloudant.com/")
            .SetDbName("brazil2014services_identity")
            .SetBasicCredentials("throbablestrustakeplandb", "YCVBS23GBpwwcc8Urd3MIvld")
            .Build();

        }

    }
}