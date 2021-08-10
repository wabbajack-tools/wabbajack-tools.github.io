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
    public class PostGenerator : AGenerator
    {
        protected override string DirectoryName => "posts";

        protected override (string, SourceText) GenerateManagerClass(List<string> classes)
        {
            var sb = new StringBuilder(@"
using System;
using System.Linq;
using System.Collections.Generic;
using Wabbajack.Web.Posts;
namespace Wabbajack.Web.Services
{
    public partial class PostManager
    {
        public IReadOnlyList<IPost> Posts => ");
            if (classes.Any())
            {
                var classString = classes.Aggregate((x, y) => $"{x},{y}");
                sb.Append($"new[] {{{classString}}};");
            }
            else
            {
                sb.Append("Array.Empty<IPost>();");
            }
            sb.Append(@"
        public bool TryGetPost(Guid id, out IPost res)
        {
            res = Posts.FirstOrDefault(x => x.Id.Equals(id));
            return res == null;
        }
    }
}
");

            return ("PostManager.generated.cs", SourceText.From(sb.ToString(), Encoding.UTF8, SourceHashAlgorithm.Sha256));
        }

        protected override (string, string, SourceText) GenerateClass(string file)
        {
            if (!File.Exists(file))
                throw new ArgumentException($"File does not exist at \"{file}\"!", nameof(file));

            var fileName = Path.GetFileNameWithoutExtension(file)!;

            var sDate = fileName.Substring(0, 4 + 1 + 2 + 1 + 2);
            var date = DateTime.ParseExact(sDate, "yyyy-MM-dd", new NumberFormatInfo());
            var dateBinary = date.ToBinary();


            var contents = File.ReadAllText(file);
            var yaml = ParseYamlInMarkdown(contents, file);

            if (!yaml.TryGetValue("id", out var sId))
                throw new Exception($"File \"{file}\" does not have an id!");
            if (!yaml.TryGetValue("title", out var title))
                throw new Exception($"File \"{file}\" does not have a title!");
            if (!yaml.TryGetValue("author", out var author))
                throw new Exception($"File \"{file}\" does not have an author!");

            var guid = Guid.ParseExact(sId, "N");

            var startIndex = contents.LastIndexOf("---", StringComparison.OrdinalIgnoreCase) + 3;
            if (startIndex == -1)
                throw new Exception($"Unable to find start index of \"---\" in file \"{file}\"");

            var contentStringBuilder = new StringBuilder(contents, startIndex, contents.Length - startIndex, contents.Length);
            contentStringBuilder.Replace("\"", "\"\"");

            var className = $"Post_{date:yyyy_MM_dd}_{guid:N}";

            var sb = new StringBuilder(@"
using System;
namespace Wabbajack.Web.Posts
{
    public class ");
            sb.Append(className);

            sb.Append(@" : IPost
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
        public DateTime Date => ");
            sb.Append($"DateTime.FromBinary({dateBinary});");

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
