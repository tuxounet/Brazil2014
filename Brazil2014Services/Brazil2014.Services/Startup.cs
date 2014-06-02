using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(C2S.Brazil2014.Services.Startup))]
namespace C2S.Brazil2014.Services
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
