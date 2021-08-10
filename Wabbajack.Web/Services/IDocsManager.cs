using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Wabbajack.Web.Docs;

namespace Wabbajack.Web.Services
{
    public interface IDocsManager
    {
        public IReadOnlyList<IDocumentation> Docs { get; }

        public bool TryGetDocumentation(Guid id, [MaybeNullWhen(false)] out IDocumentation res);
    }

    public partial class DocsManager : IDocsManager { }
}

namespace Wabbajack.Web.Docs
{
    public interface IDocumentation
    {
        public Guid Id { get; }

        public string Title { get; }

        public string Author { get; }

        public DateTime Published { get; }

        public DateTime Updated { get; }

        public string Markdown { get; }
    }
}
