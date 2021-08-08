using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Wabbajack.DTOs;

namespace Wabbajack.Web.Services
{
    /// <summary>
    /// Manages the State of the Application
    /// </summary>
    public interface IStateContainer
    {
        IEnumerable<ModlistMetadata> Modlists { get; }
        IEnumerable<ModListSummary> ModlistSummaries { get; }
        Task<bool> LoadModlistMetadata();
        bool TryGetModlistMetadata(string machineUrl, [MaybeNullWhen(false)] out ModlistMetadata modlistMetadata);
        Task<bool> LoadModlistSummaries();
    }
}
