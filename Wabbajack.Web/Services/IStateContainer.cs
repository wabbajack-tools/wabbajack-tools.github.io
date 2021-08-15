#nullable enable
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Wabbajack.DTOs;
using Wabbajack.DTOs.ServerResponses;

namespace Wabbajack.Web.Services
{
    /// <summary>
    /// Manages the State of the Application.
    /// </summary>
    public interface IStateContainer
    {
        IEnumerable<ModlistMetadata> Modlists { get; }

        Task<bool> LoadModlistMetadata();
        bool TryGetModlistMetadata(string machineUrl, [MaybeNullWhen(false)] out ModlistMetadata modlistMetadata);

        IEnumerable<ModListSummary> ModlistSummaries { get; }
        Task<bool> LoadModlistSummaries();

        IReadOnlyDictionary<string, DetailedStatus> ModlistStatusDictionary { get; }
        bool HasModlistStatus(string machineUrl);
        Task<DetailedStatus?> LoadModlistStatus(string machineUrl);
        bool TryGetModlistStatus(string machineUrl, [MaybeNullWhen(false)] out DetailedStatus modlistStatus);
    }
}
