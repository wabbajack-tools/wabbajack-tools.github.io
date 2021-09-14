using System;
using System.Globalization;

namespace Wabbajack.Web.Utils
{
    public static class SizeUtils
    {
        public static string ToFileSizeString(this ulong bytes)
        {
            if (bytes == 0) return "0B";
            var place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            var num = Math.Round(bytes / Math.Pow(1024, place), 1).ToString(CultureInfo.InvariantCulture);
            return place switch
            {
                0 => $"{num}B",
                1 => $"{num}KB",
                2 => $"{num}MB",
                3 => $"{num}GB",
                4 => $"{num}TB",
                5 => $"{num}PB",
                6 => $"{num}EB",
                _ => $"{num}"
            };
        }
    }
}
