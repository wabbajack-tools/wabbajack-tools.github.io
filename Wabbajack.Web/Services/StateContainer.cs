#nullable enable
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Wabbajack.DTOs;
using Wabbajack.DTOs.JsonConverters;
using Wabbajack.DTOs.ModListValidation;

namespace Wabbajack.Web.Services
{
    public class StateContainer : IStateContainer
    {
        // name of the repository that contain the "official" modlists
        private const string OfficialRepositoryName = "wj-featured";
        // url to the repository manifest for the "official" modlists
        private const string OfficialRepositoryUrl = "https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json";
        // url to the list containing every repository
        private const string RepositoriesUrl = "https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/repositories.json";
        // url to the list of featured modlists outside the "official" repository
        private const string FeaturedModlistNamesUrl = "https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/featured_lists.json";
        // url to the summary of all modlists from all repositories containing links to the status reports and other status info
        private const string ModlistsSummaryUrl = "https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/reports/modListSummary.json";
        // base url for all status reports
        private const string ModlistStatusBaseUrl = "https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/";

        private readonly ILogger<StateContainer> _logger;
        private readonly HttpClient _client;
        private readonly JsonSerializerOptions _jsonSerializerOptions;

        public StateContainer(ILogger<StateContainer> logger, HttpClient client, DTOSerializer dtoSerializer)
        {
            _logger = logger;
            _client = client;

            _jsonSerializerOptions = dtoSerializer.Options;
            _jsonSerializerOptions.ReadCommentHandling = JsonCommentHandling.Skip;
            _jsonSerializerOptions.AllowTrailingCommas = true;
        }

        private Dictionary<string, string> _repositoryUrls = new();
        public IDictionary<string, string> RepositoryUrls => _repositoryUrls;

        private readonly Dictionary<string, List<ModlistMetadata>> _repositories = new();
        public IDictionary<string, List<ModlistMetadata>> Repositories => _repositories;

        private Dictionary<string, List<string>> _featuredModlistNamesByRepository = new();
        public IDictionary<string, List<string>> FeaturedModlistNamesByRepository => _featuredModlistNamesByRepository;

        private Dictionary<string, ModListSummary> _modlistSummaries = new();
        public IDictionary<string, ModListSummary> ModlistSummaries => _modlistSummaries;

        private readonly Dictionary<string, ValidatedModList> _modlistStatusReports = new();
        public IDictionary<string, ValidatedModList> ModlistStatusReports => _modlistStatusReports;

        // we manually add "wj-featured" to the dictionary so here we want to check for > 1
        public bool HasLoadedRepositoryUrls() => _repositoryUrls.Count > 1;
        public bool TryGetRepository(string repositoryName, [MaybeNullWhen(false)] out List<ModlistMetadata> repository) => _repositories.TryGetValue(repositoryName, out repository) && repository.Count != 0;
        public bool HasLoadedFeaturedModlistNames() => _featuredModlistNamesByRepository.Count != 0;
        public bool HasLoadedModlistSummaries() => _modlistSummaries.Count != 0;
        public bool TryGetModlistStatusReport(string machineUrl, [MaybeNullWhen(false)] out ValidatedModList statusReport) => _modlistStatusReports.TryGetValue(machineUrl, out statusReport);

        public IEnumerable<ModlistMetadata> GetOfficialModlists()
        {
            if (TryGetRepository(OfficialRepositoryName, out var modlists)) return modlists;
            return Array.Empty<ModlistMetadata>();
        }

        public IEnumerable<ModlistMetadata> GetFeaturedModlists()
        {
            if (!HasLoadedFeaturedModlistNames()) yield break;

            foreach (var repositoryName in _featuredModlistNamesByRepository.Keys)
            {
                if (!TryGetRepository(repositoryName, out var modlists)) yield break;

                var featured = _featuredModlistNamesByRepository[repositoryName];
                foreach (var modlistName in featured)
                {
                    var featuredModlist = modlists.FirstOrDefault(x => x.Links.MachineURL.Equals(modlistName));
                    if (featuredModlist is null) yield break;
                    yield return featuredModlist;
                }
            }
        }

        public IEnumerable<ModlistMetadata> GetAllModlists()
        {
            return _repositories.SelectMany(x => x.Value);
        }

        public async Task<bool> LoadRepositoryUrls(CancellationToken cancellationToken = default)
        {
            if (HasLoadedRepositoryUrls()) return true;

            try
            {
                var res = await _client.GetFromJsonAsync<Dictionary<string, string>>(RepositoriesUrl, _jsonSerializerOptions, cancellationToken);
                if (res is null || res.Count == 0)
                {
                    _logger.LogWarning("Loaded 0 Repositories from {Url}", RepositoriesUrl);
                    return false;
                }

                _repositoryUrls = res;
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception while loading Repositories from {Url}", RepositoriesUrl);
                return false;
            }
        }

        public async Task<bool> LoadRepository(string repositoryName, CancellationToken cancellationToken = default)
        {
            if (TryGetRepository(repositoryName, out _)) return true;

            if (!HasLoadedRepositoryUrls())
            {
                var res = await LoadRepositoryUrls(cancellationToken);
                if (!res) return false;
            }

            if (!RepositoryUrls.TryGetValue(repositoryName, out var repositoryUrl))
            {
                _logger.LogError("Unknown Repository: \"{RepositoryName}\"", repositoryName);
                return false;
            }

            try
            {
                var res = await _client.GetFromJsonAsync<List<ModlistMetadata>>(repositoryUrl, _jsonSerializerOptions, cancellationToken);
                if (res is null || res.Count == 0)
                {
                    _logger.LogWarning("Loaded 0 Modlists from Repository \"{RepositoryName}\" at {Url}", repositoryName, repositoryUrl);
                    return false;
                }

                foreach (var modlist in res)
                {
                    // need to manually set the repository name as it's not saved in JSON
                    modlist.RepositoryName = repositoryName;
                }

                _repositories.Add(repositoryName, res);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception while loading Modlists from Repository \"{RepositoryName}\" at {Url}", repositoryName, repositoryUrl);
                return false;
            }
        }

        public async Task<bool> LoadFeaturedModlistNames(CancellationToken cancellationToken = default)
        {
            if (HasLoadedFeaturedModlistNames()) return true;

            try
            {
                var res = await _client.GetFromJsonAsync<List<string>>(FeaturedModlistNamesUrl, _jsonSerializerOptions, cancellationToken);
                if (res is null || res.Count == 0)
                {
                    _logger.LogWarning("Loaded 0 featured Modlists from {Url}", FeaturedModlistNamesUrl);
                    return false;
                }

                // "{repo}/{modlistName}"
                _featuredModlistNamesByRepository = res
                    .Select(x => x.Split('/'))
                    .Select(x => (repositoryName: x[0], modlistName: x[1]))
                    .GroupBy(x => x.repositoryName, x => x.modlistName)
                    .ToDictionary(x => x.Key, x => x.ToList(), StringComparer.OrdinalIgnoreCase);

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception while loading featured Modlists from {Url}", FeaturedModlistNamesUrl);
                return false;
            }
        }

        public async Task<bool> LoadOfficialModlists(CancellationToken cancellationToken = default)
        {
            if (TryGetRepository(OfficialRepositoryName, out _)) return true;
            if (!_repositories.ContainsKey(OfficialRepositoryName))
            {
                _repositoryUrls.Add(OfficialRepositoryName, OfficialRepositoryUrl);
            }

            return await LoadRepository(OfficialRepositoryName, cancellationToken);
        }

        public async Task<bool> LoadFeaturedModlists(CancellationToken cancellationToken = default)
        {
            if (!HasLoadedFeaturedModlistNames())
            {
                var res = await LoadFeaturedModlistNames(cancellationToken);
                if (!res) return false;
            }

            foreach (var repositoryName in _featuredModlistNamesByRepository.Keys)
            {
                var res = await LoadRepository(repositoryName, cancellationToken);
                if (!res) return false;
            }

            return true;
        }

        public async Task<bool> LoadAllModlists(CancellationToken cancellationToken = default)
        {
            if (!HasLoadedRepositoryUrls())
            {
                var res = await LoadRepositoryUrls(cancellationToken);
                if (!res) return false;
            }

            foreach (var repositoryName in _repositoryUrls.Keys)
            {
                var res = await LoadRepository(repositoryName, cancellationToken);
                if (!res) return false;
            }

            return true;
        }

        public async Task<bool> LoadModlistSummaries(CancellationToken cancellationToken = default)
        {
            if (HasLoadedModlistSummaries()) return true;

            try
            {
                var res = await _client.GetFromJsonAsync<List<ModListSummary>>(ModlistsSummaryUrl, _jsonSerializerOptions, cancellationToken);
                if (res is null || res.Count == 0)
                {
                    _logger.LogWarning("Loaded 0 Modlist summaries from {Url}", ModlistsSummaryUrl);
                    return false;
                }

                _modlistSummaries = res.ToDictionary(x => x.MachineURL, x => x, StringComparer.OrdinalIgnoreCase);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception while loading Modlist summaries from {Url}", ModlistsSummaryUrl);
                return false;
            }
        }

        public async Task<bool> LoadModlistStatusReport(string machineUrl, CancellationToken cancellationToken = default)
        {
            if (TryGetModlistStatusReport(machineUrl, out _)) return true;

            if (!HasLoadedModlistSummaries())
            {
                var res = await LoadModlistSummaries(cancellationToken);
                if (!res) return false;
            }

            if (!_modlistSummaries.TryGetValue(machineUrl, out var modListSummary))
            {
                _logger.LogError("Unable to find summary of Modlist \"{MachineUrl}\"", machineUrl);
                return false;
            }

            var statusReportUrl = ModlistStatusBaseUrl + modListSummary.Link;

            try
            {
                var res = await _client.GetFromJsonAsync<ValidatedModList>(statusReportUrl, _jsonSerializerOptions, cancellationToken);
                if (res is null)
                {
                    _logger.LogWarning("Loaded null status report for Modlist \"{MachineUrl}\" at {Url}", machineUrl, statusReportUrl);
                    return false;
                }

                _modlistStatusReports.Add(machineUrl, res);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Exception while loading status report for Modlist \"{MachineUrl}\" at {Url}", machineUrl, statusReportUrl);
                return false;
            }
        }
    }
}
