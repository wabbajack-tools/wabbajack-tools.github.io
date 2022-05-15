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
using Wabbajack.Networking.WabbajackClientApi;

namespace Wabbajack.Web.Services
{
    public class StateContainer : IStateContainer
    {
        private readonly ILogger<StateContainer> _logger;

        public StateContainer(ILogger<StateContainer> logger, Client wjClient)
        {
            _logger = logger;
            _wjClient = wjClient;
        }

        private readonly Dictionary<string, string> _repositoryUrls = new(StringComparer.OrdinalIgnoreCase);
        public IDictionary<string, string> RepositoryUrls => _repositoryUrls;

        public IDictionary<string, List<ModlistMetadata>> Repositories => _repositories.ToDictionary(r => r.Key,
            r => _modlists.Where(m => m.RepositoryName == r.Key).ToList());

        private Dictionary<string, List<string>> _featuredModlistNamesByRepository = new(StringComparer.OrdinalIgnoreCase);
        public IDictionary<string, List<string>> FeaturedModlistNamesByRepository => _featuredModlistNamesByRepository;

        private Dictionary<string, ModListSummary> _modlistSummaries = new(StringComparer.OrdinalIgnoreCase);
        public IDictionary<string, ModListSummary> ModlistSummaries => _modlistSummaries;

        private readonly Dictionary<string, ValidatedModList> _modlistStatusReports = new(StringComparer.OrdinalIgnoreCase);
        private readonly Client _wjClient;
        private ModlistMetadata[] _modlists = Array.Empty<ModlistMetadata>();
        private IDictionary<string,Uri> _repositories = new Dictionary<string, Uri>();
        public IDictionary<string, ValidatedModList> ModlistStatusReports => _modlistStatusReports;

        // we manually add "wj-featured" to the dictionary so here we want to check for > 1
        public bool HasLoadedRepositoryUrls() => _repositoryUrls.Count > 0;
        public bool HasLoadedModlistSummaries() => _modlistSummaries.Count != 0;
        public bool TryGetModlistStatusReport(string machineUrl, [MaybeNullWhen(false)] out ValidatedModList statusReport) => _modlistStatusReports.TryGetValue(machineUrl, out statusReport);

        public IEnumerable<ModlistMetadata> GetFeaturedModlists()
        {
            return _modlists.Where(m => m.Official);
        }

        public IEnumerable<ModlistMetadata> GetAllModlists()
        {
            return _modlists;
        }

        public async Task<bool> LoadData(CancellationToken ctsToken)
        {
            if (_modlists.Length > 0) return true;
            try
            {
                var modlists = _wjClient.LoadLists();
                var repositories = _wjClient.LoadRepositories();
                var summaries = (await _wjClient.GetListStatuses()).ToDictionary(m => m.MachineURL);

                _modlists = (await modlists).Select(l =>
                {
                    if (summaries.TryGetValue(l.NamespacedName, out var summary))
                        l.ValidationSummary = summary;
                    return l;
                }).ToArray();
                _repositories = await repositories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "While loading modlist data");
                return false;
            }
            return true;
        }

        public async Task<bool> LoadStatusReport(string machineUrl, CancellationToken ctsToken)
        {
            if (_modlistStatusReports.ContainsKey(machineUrl))
                return true;

            try
            {
                var report = await _wjClient.GetDetailedStatus(machineUrl);
                _modlistStatusReports[machineUrl] = report;
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "While loading Status Report");
                return false;
            }

        }
    }
}
