using System;

namespace Wabbajack.Web.Utils
{
    public static class LinkUtils
    {
        public static bool CanRenderReadme(string readmeUrl)
        {
            var uri = new Uri(readmeUrl, UriKind.Absolute);

            var isGitHub = uri.Host.Equals("raw.githubusercontent.com", StringComparison.OrdinalIgnoreCase);
            return isGitHub;
        }
    }
}
