using System.Collections.Generic;
using System.Linq;
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
        public const string OfficialRepository = "Official";

        private bool _showNsfw;
        public bool ShowNsfw
        {
            get => _showNsfw;
            set
            {
                if (value == _showNsfw) return;
                _showNsfw = value;

                // need to reset the tags because some tags only appear on NSFW modlists
                // don't want to create more complex logic for this...
                SelectedTags.Clear();
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

        private string _selectedRepository = OfficialRepository;
        public string SelectedRepository
        {
            get => _selectedRepository;
            set
            {
                if (value == _selectedRepository) return;
                _selectedRepository = value;
                UpdateQueryString();
            }
        }

        public List<string> SelectedTags { get; set; } = new();

        public void UpdateQueryString()
        {
            var queryParams = new Dictionary<string, object?>
            {
                { "selectedGame", _selectedGame == All ? null : _selectedGame },
                { "showNSFW", _showNsfw ? "true" : null },
                { "selectedTags", SelectedTags.Count == 0 ? null : SelectedTags.Aggregate((x,y) => $"{x},{y}") },
                { "selectedRepository", _selectedRepository == OfficialRepository ? null : _selectedRepository }
            };

            var newUri = _navigationManager.GetUriWithQueryParameters(queryParams);
            _navigationManager.NavigateTo(newUri);
        }

        public void GetValuesFromQueryString()
        {
            var query = HttpUtility.ParseQueryString(_navigationManager.ToAbsoluteUri(_navigationManager.Uri).Query);

            if (_selectedGame == All)
                _selectedGame = query.Get("selectedGame") ?? All;
            if (_selectedRepository == OfficialRepository)
                _selectedRepository = query.Get("selectedRepository") ?? OfficialRepository;

            if (!_showNsfw)
                _showNsfw = query.Get("showNSFW") == "true";

            var selectedTags = query.Get("selectedTags");
            if (selectedTags != null)
                SelectedTags = selectedTags.Split(',').ToList();
        }
    }
}
