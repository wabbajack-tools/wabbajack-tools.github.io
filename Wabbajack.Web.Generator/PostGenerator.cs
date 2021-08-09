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
    public class PostGenerator : ISourceGenerator
    {
        public void Initialize(GeneratorInitializationContext context) { }

        public void Execute(GeneratorExecutionContext context)
        {
            var files = context.AdditionalFiles
                .Select(x => x.Path)
                .Select(Path.GetFullPath)
                .Where(x => x.EndsWith(".md", StringComparison.OrdinalIgnoreCase))
                .ToList();

            var classes = new List<string>(files.Count);

            foreach (var file in files)
            {
                var (className, fileName, sourceText) = GeneratePostComponent(file);
                context.AddSource(fileName, sourceText);

                classes.Add($"new {className}()");
            }


            var sb = new StringBuilder(@"
using System;
using System.Collections.Generic;
using Wabbajack.Web.Posts;
namespace Wabbajack.Web.Services
{
    public class PostManager : IPostManager
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
    }
}
");

            context.AddSource("PostManager.generated.cs", SourceText.From(sb.ToString(), Encoding.UTF8, SourceHashAlgorithm.Sha256));
        }

        private static (string, string, SourceText) GeneratePostComponent(string file)
        {
            if (!File.Exists(file))
                throw new ArgumentException($"File does not exist at \"{file}\"!", nameof(file));

            var fileName = Path.GetFileNameWithoutExtension(file)!;

            var sDate = fileName.Substring(0, 4 + 1 + 2 + 1 + 2);
            var date = DateTime.ParseExact(sDate, "yyyy-MM-dd", new NumberFormatInfo());
            var dateBinary = date.ToBinary();

            var guid = Guid.NewGuid();
            var className = $"Post_{date:yyyy_MM_dd}_{guid:N}";

            var contentStringBuilder = new StringBuilder(File.ReadAllText(file));
            contentStringBuilder.Replace("\"", "\"\"");

            var sb = new StringBuilder(@"
using System;
namespace Wabbajack.Web.Posts
{
    public class ");
            sb.Append(className);

            sb.Append(@" : IPost
    {
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
