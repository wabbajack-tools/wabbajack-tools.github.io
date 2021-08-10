using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Markdig;
using Markdig.Extensions.Yaml;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Text;
using YamlDotNet.RepresentationModel;

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
using System.Linq;
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
        public bool TryGetPost(Guid id, out IPost post)
        {
            post = Posts.FirstOrDefault(x => x.Id.Equals(id));
            return post == null;
        }
    }
}
");

            context.AddSource("PostManager.generated.cs", SourceText.From(sb.ToString(), Encoding.UTF8, SourceHashAlgorithm.Sha256));
        }


        private static readonly MarkdownPipeline Pipeline = new MarkdownPipelineBuilder().UseYamlFrontMatter().Build();

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

            var contents = File.ReadAllText(file);

            var document = Markdown.Parse(contents, Pipeline);

            var yamlBlock = (YamlFrontMatterBlock?) document.FirstOrDefault(x => x is YamlFrontMatterBlock);
            if (yamlBlock == null)
                throw new Exception($"Found no YamlFrontMatterBlock in Post \"{file}\"");

            var yamlContent = yamlBlock.Lines.ToSlice().ToString();

            var input = new StringReader(yamlContent);
            var yaml = new YamlStream();
            yaml.Load(input);

            var mapping = (YamlMappingNode)yaml.Documents[0].RootNode;

            var keys = mapping.Children.Select(x => x.Key)
                .ToList();
            var titleKey = keys.FirstOrDefault(x => x is YamlScalarNode { Value: "title" });
            var authorKey = keys.FirstOrDefault(x => x is YamlScalarNode { Value: "author" });

            if (titleKey == null)
                throw new Exception($"Post \"{file}\" does not have a title!");
            if (authorKey == null)
                throw new Exception($"Post \"{file}\" does not have an author!");

            var title = ((YamlScalarNode) mapping.Children[titleKey]).Value!;
            var author = ((YamlScalarNode) mapping.Children[authorKey]).Value!;

            var startIndex = contents.LastIndexOf("---", StringComparison.OrdinalIgnoreCase) + 3;
            if (startIndex == -1)
                throw new Exception($"Unable to find start index of \"---\" in post \"{file}\"");

            var contentStringBuilder = new StringBuilder(contents, startIndex, contents.Length - startIndex, contents.Length);
            contentStringBuilder.Replace("\"", "\"\"");

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
