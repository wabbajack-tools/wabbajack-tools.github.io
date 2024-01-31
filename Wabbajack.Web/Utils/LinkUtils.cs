using System;
using System.Collections.Generic;

namespace Wabbajack.Web.Utils
{
    public static class LinkUtils
    {
        public static NavHistory<string> previousURLs = new (10);
        public static string currentURL = string.Empty;
        public static bool CanRenderReadme(string readmeUrl)
        {
            var uri = new Uri(readmeUrl, UriKind.Absolute);

            var isGitHub = uri.Host.Equals("raw.githubusercontent.com", StringComparison.OrdinalIgnoreCase);
            return isGitHub;
        }
    }
}
