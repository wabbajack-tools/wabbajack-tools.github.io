#nullable enable

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Components;
using Wabbajack.Web.Shared;

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
        public const string FeaturedRepository = "Featured";

        private TriCheckboxComponent.TriCheckboxState _nsfwState = TriCheckboxComponent.TriCheckboxState.False;
        public TriCheckboxComponent.TriCheckboxState NSFWState
        {
            get => _nsfwState;
            set
            {
                if (value == _nsfwState) return;
                _nsfwState = value;
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

        private string _selectedRepository = FeaturedRepository;
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
                { "nsfw", _nsfwState switch
                {
                    TriCheckboxComponent.TriCheckboxState.False => null,
                    TriCheckboxComponent.TriCheckboxState.True => "true",
                    TriCheckboxComponent.TriCheckboxState.Indeterminate => "indeterminate",
                    _ => throw new ArgumentOutOfRangeException()
                } },
                { "selectedTags", SelectedTags.Count == 0 ? null : SelectedTags.Aggregate((x,y) => $"{x},{y}") },
                { "selectedRepository", _selectedRepository == FeaturedRepository ? null : _selectedRepository }
            };

            var newUri = _navigationManager.GetUriWithQueryParameters(queryParams);
            _navigationManager.NavigateTo(newUri);
        }

        public void GetValuesFromQueryString()
        {
            var query = HttpUtility.ParseQueryString(_navigationManager.ToAbsoluteUri(_navigationManager.Uri).Query);

            if (_selectedGame == All)
                _selectedGame = query.Get("selectedGame") ?? All;
            if (_selectedRepository == FeaturedRepository)
                _selectedRepository = query.Get("selectedRepository") ?? FeaturedRepository;

            if (_nsfwState == TriCheckboxComponent.TriCheckboxState.False)
            {
                var sState = query.Get("nsfw");
                var newState = sState switch
                {
                    "true" => TriCheckboxComponent.TriCheckboxState.True,
                    "indeterminate" => TriCheckboxComponent.TriCheckboxState.Indeterminate,
                    _ => TriCheckboxComponent.TriCheckboxState.False
                };

                _nsfwState = newState;
            }

            var selectedTags = query.Get("selectedTags");
            if (selectedTags != null)
                SelectedTags = selectedTags.Split(',').ToList();
        }
    }
}
