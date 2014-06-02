using C2S.Brazil2014.Services.App_Start;
using MyCouch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace C2S.Brazil2014.Services
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            IdentityConfig.Configure();
        }


        protected void Application_BeginRequest()
        {
            HttpContext.Current.Items["CouchIdentityClient"] = new MyCouchClient(IdentityConfig.CreateIdentityUri());
        }

        protected void Application_EndRequest()
        {
            var client = HttpContext.Current.Items["CouchIdentityClient"] as IMyCouchClient;
            if (client != null)
            {
                client.Dispose();
            }
        }


    }
}
