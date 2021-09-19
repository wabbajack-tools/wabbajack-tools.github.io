using System.Collections.Generic;
using System.Web;
using Microsoft.AspNetCore.Components;

#nullable enable

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

        private bool _showNsfw;
        public bool ShowNsfw
        {
            get => _showNsfw;
            set
            {
                if (value == _showNsfw) return;
                _showNsfw = value;
                UpdateQueryString();
            }
        }

        private string _selectedGame = All;
        public string SelectedGame
        {
            get => _selectedGame;
            set
            {
                if (value == _selectedGame) return;
                _selectedGame = value;
                UpdateQueryString();
            }
        }

        public void UpdateQueryString()
        {
            var queryParams = new Dictionary<string, object?>
            {
                { "selectedGame", _selectedGame == All ? null : _selectedGame },
                { "showNSFW", _showNsfw ? "true" : null }
            };

            var newUri = _navigationManager.GetUriWithQueryParameters(queryParams);
            _navigationManager.NavigateTo(newUri);
        }

        public void GetValuesFromQueryString()
        {
            var query = HttpUtility.ParseQueryString(_navigationManager.ToAbsoluteUri(_navigationManager.Uri).Query);

            if (_selectedGame == All)
                _selectedGame = query.Get("selectedGame") ?? All;
            if (!_showNsfw)
                _showNsfw = query.Get("showNSFW") == "true";
        }
    }
}
