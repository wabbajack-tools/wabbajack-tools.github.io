using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Text;

namespace Wabbajack.Web.Generator
{
    [Generator]
    public class DocsGenerator : AGenerator
    {
        protected override string DirectoryName => "docs";

        protected override (string, SourceText) GenerateManagerClass(List<string> classes)
        {
            var sb = new StringBuilder(@"
using System;
using System.Linq;
using System.Collections.Generic;
using Wabbajack.Web.Docs;
namespace Wabbajack.Web.Services
{
    public partial class DocsManager
    {
        public IReadOnlyList<IDocumentation> Docs => ");
            if (classes.Any())
            {
                var classString = classes.Aggregate((x, y) => $"{x},{y}");
                sb.Append($"new[] {{{classString}}};");
            }
            else
            {
                sb.Append("Array.Empty<IDocumentation>();");
            }
            sb.Append(@"
        public bool TryGetDocumentation(Guid id, out IDocumentation res)
        {
            res = Docs.FirstOrDefault(x => x.Id.Equals(id));
            return res == null;
        }
    }
}
");

            return ("DocsManager.generated.cs", SourceText.From(sb.ToString(), Encoding.UTF8, SourceHashAlgorithm.Sha256));
        }

        protected override (string, string, SourceText) GenerateClass(string file)
        {
            if (!File.Exists(file))
                throw new ArgumentException($"File does not exist at \"{file}\"!", nameof(file));

            var contents = File.ReadAllText(file);
            var yaml = ParseYamlInMarkdown(contents, file);

            if (!yaml.TryGetValue("id", out var sId))
                throw new Exception($"File \"{file}\" does not have an id!");
            if (!yaml.TryGetValue("title", out var title))
                throw new Exception($"File \"{file}\" does not have a title!");
            if (!yaml.TryGetValue("author", out var author))
                throw new Exception($"File \"{file}\" does not have an author!");
            if (!yaml.TryGetValue("published", out var sPublished))
                throw new Exception($"File \"{file}\" does not have a published date!");
            yaml.TryGetValue("updated", out var sUpdated);

            var guid = Guid.ParseExact(sId, "N");

            var published = DateTime.ParseExact(sPublished, "yyyy-MM-dd", new NumberFormatInfo());
            var updated = sUpdated == null
                ? DateTime.MinValue
                : DateTime.ParseExact(sUpdated, "yyyy-MM-dd", new NumberFormatInfo());

            var startIndex = contents.LastIndexOf("---", StringComparison.OrdinalIgnoreCase) + 3;
            if (startIndex == -1)
                throw new Exception($"Unable to find start index of \"---\" in file \"{file}\"");

            var contentStringBuilder = new StringBuilder(contents, startIndex, contents.Length - startIndex, contents.Length);
            contentStringBuilder.Replace("\"", "\"\"");

            var className = $"Documentation_{guid:N}";

            var sb = new StringBuilder(@"
using System;
namespace Wabbajack.Web.Docs
{
    public class ");
            sb.Append(className);

            sb.Append(@" : IDocumentation
    {
        public Guid Id => ");
            sb.Append($"Guid.ParseExact(\"{guid:N}\", \"N\");");
            sb.Append(@"
        public string Title => ");
            sb.Append($"\"{title}\";");
            sb.Append(@"
        public string Author => ");
            sb.Append($"\"{author}\";");
            sb.Append(@"
        public DateTime Published => ");
            sb.Append($"DateTime.FromBinary({published.ToBinary()});");
            sb.Append(@"
        public DateTime Updated => ");
            sb.Append($"DateTime.FromBinary({updated.ToBinary()});");
            sb.Append(@"
        public string Markdown => @""");
            sb.Append(contentStringBuilder);
            sb.Append(@""";
    }
}
");

            return (className, $"{className}.generated.cs", SourceText.From(sb.ToString(), Encoding.UTF8, SourceHashAlgorithm.Sha256));
        }
    }
}
