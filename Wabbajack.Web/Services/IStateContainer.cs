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
        Task<bool> LoadRepositoryUrls(CancellationToken cancellationToken = default);

        bool TryGetRepository(string repositoryName, [MaybeNullWhen(false)] out List<ModlistMetadata> repository);
        IDictionary<string, List<ModlistMetadata>> Repositories { get; }
        Task<bool> LoadRepository(string repositoryName, CancellationToken cancellationToken = default);

        bool HasLoadedFeaturedModlistNames();
        IDictionary<string, List<string>> FeaturedModlistNamesByRepository { get; }
        Task<bool> LoadFeaturedModlistNames(CancellationToken cancellationToken = default);

        IEnumerable<ModlistMetadata> GetFeaturedModlists();
        Task<bool> LoadFeaturedModlists(CancellationToken cancellationToken = default);

        IEnumerable<ModlistMetadata> GetAllModlists();
        Task<bool> LoadAllModlists(CancellationToken cancellationToken = default);

        bool HasLoadedModlistSummaries();
        IDictionary<string, ModListSummary> ModlistSummaries { get; }
        Task<bool> LoadModlistSummaries(CancellationToken cancellationToken = default);

        bool TryGetModlistStatusReport(string machineUrl, [MaybeNullWhen(false)] out ValidatedModList statusReport);
        IDictionary<string, ValidatedModList> ModlistStatusReports { get; }
        Task<bool> LoadModlistStatusReport(string machineUrl, CancellationToken cancellationToken = default);
    }
}
