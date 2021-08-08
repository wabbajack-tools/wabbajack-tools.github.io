using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Wabbajack.DTOs;

#nullable enable

namespace Wabbajack.Web.Services
{
    /// <summary>
    /// Singleton managing the state of the application.
    /// </summary>
    public class StateContainer
    {
        private const string ModlistsJsonUrl = "https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json";
        private const string ModlistsSummaryUrl = "https://build.wabbajack.org/lists/status.json";

        private readonly HttpClient _client;
        private readonly JsonSerializerOptions _jsonSerializerOptions;

        public StateContainer(HttpClient client, IEnumerable<JsonConverter> converters)
        {
            _client = client;

            _jsonSerializerOptions = new JsonSerializerOptions
            {
                ReadCommentHandling = JsonCommentHandling.Skip,
                AllowTrailingCommas = true
            };

            foreach (var c in converters) _jsonSerializerOptions.Converters.Add(c);
        }

        private List<ModlistMetadata> _modlists = new();
        public IEnumerable<ModlistMetadata> Modlists => _modlists;

        public async Task<bool> LoadModlistMetadata()
        {
            var res = await _client.GetFromJsonAsync<List<ModlistMetadata>>(
                ModlistsJsonUrl,
                _jsonSerializerOptions,
                CancellationToken.None);

            if (res == null) return false;

            _modlists = res;
            return true;
        }

        public bool TryGetModlistMetadata(string machineUrl, [MaybeNullWhen(false)] out ModlistMetadata modlistMetadata)
        {
            modlistMetadata = _modlists.FirstOrDefault(x => x.Links.MachineURL.Equals(machineUrl, StringComparison.OrdinalIgnoreCase));
            return modlistMetadata != null;
        }

        private List<ModListSummary> _modlistSummaries = new();
        public IEnumerable<ModListSummary> ModlistSummaries => _modlistSummaries;

        public async Task<bool> LoadModlistSummaries()
        {
            var res = await _client.GetFromJsonAsync<List<ModListSummary>>(
                ModlistsSummaryUrl,
                _jsonSerializerOptions,
                CancellationToken.None);

            if (res == null) return false;

            _modlistSummaries = res;
            return true;
        }
    }
}
