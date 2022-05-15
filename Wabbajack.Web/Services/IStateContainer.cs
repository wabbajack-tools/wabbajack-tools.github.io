#nullable enable
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;
using Wabbajack.DTOs;
using Wabbajack.DTOs.ModListValidation;

namespace Wabbajack.Web.Services
{
    /// <summary>
    /// Manages the State of the Application.
    /// </summary>
    [SuppressMessage("ReSharper", "UnusedMemberInSuper.Global")]
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    public interface IStateContainer
    {
        bool HasLoadedRepositoryUrls();
        IDictionary<string, string> RepositoryUrls { get; }
        IDictionary<string, List<ModlistMetadata>> Repositories { get; }
        IDictionary<string, List<string>> FeaturedModlistNamesByRepository { get; }
        IEnumerable<ModlistMetadata> GetFeaturedModlists();
        IEnumerable<ModlistMetadata> GetAllModlists();
        bool HasLoadedModlistSummaries();
        IDictionary<string, ModListSummary> ModlistSummaries { get; }
        bool TryGetModlistStatusReport(string machineUrl, [MaybeNullWhen(false)] out ValidatedModList statusReport);
        IDictionary<string, ValidatedModList> ModlistStatusReports { get; }
        Task<bool> LoadData(CancellationToken ctsToken);
        Task<bool> LoadStatusReport(string machineUrl, CancellationToken ctsToken);
    }
}
