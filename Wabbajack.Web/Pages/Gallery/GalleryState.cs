using System.Collections.Generic;
using System.Web;
using Microsoft.AspNetCore.Components;

namespace Wabbajack.Web.Pages.Gallery
{
    public class GalleryState
    {
        private readonly NavigationManager _navigationManager;

        public GalleryState(NavigationManager navigationManager)
        {
            _navigationManager = navigationManager;
        }

        public const string All = "All";

        private bool _showNSFW;
        public bool ShowNSFW
        {
            get => _showNSFW;
            set
            {
                _showNSFW = value;
                UpdateQueryString();
            }
        }

        private string _selectedGame = All;
        public string SelectedGame
        {
            get => _selectedGame;
            set
            {
                _selectedGame = value;
                UpdateQueryString();
            }
        }

        private void UpdateQueryString()
        {
            var newUri = _navigationManager.GetUriWithQueryParameters(new Dictionary<string, object>
            {
                {"selectedGame", SelectedGame},
                {"showNSFW", ShowNSFW ? "true" : "false"}
            });

            _navigationManager.NavigateTo(newUri);
        }

        public void GetValuesFromQueryString()
        {
            var query = HttpUtility.ParseQueryString(_navigationManager.ToAbsoluteUri(_navigationManager.Uri).Query);

            _selectedGame = query.Get("selectedGame") ?? string.Empty;
            _showNSFW = query.Get("showNSFW") == "true";
        }
    }
}
