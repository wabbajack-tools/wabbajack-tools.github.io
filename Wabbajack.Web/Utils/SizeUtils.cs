using System;

namespace Wabbajack.Web.Utils
{
    public static class SizeUtils
    {
        private static readonly string[] Suffix = {"B", "KB", "MB", "GB", "TB", "PB", "EB"};

        public static string ToFileSizeString(this ulong bytes)
        {
            if (bytes == 0) return "0" + Suffix[0];
            var place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            var num = Math.Round(bytes / Math.Pow(1024, place), 1);
            return num + Suffix[place];
        }
    }
}
