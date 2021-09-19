namespace Wabbajack.Web.Pages.Gallery
{
    public class GalleryState
    {
        public const string All = "All";

        public bool ShowNSFW { get; set; }

        public string SelectedGame { get; set; } = All;
    }
}
