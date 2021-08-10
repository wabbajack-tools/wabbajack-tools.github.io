using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Markdig;
using Markdig.Extensions.Yaml;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Text;
using YamlDotNet.RepresentationModel;

namespace Wabbajack.Web.Generator
{
    public abstract class AGenerator : ISourceGenerator
    {
        private static readonly MarkdownPipeline Pipeline = new MarkdownPipelineBuilder().UseYamlFrontMatter().Build();

        protected abstract string DirectoryName { get; }
        protected abstract (string, string, SourceText) GenerateClass(string file);
        protected abstract (string, SourceText) GenerateManagerClass(List<string> classes);

        public void Initialize(GeneratorInitializationContext context) { }
        public void Execute(GeneratorExecutionContext context)
        {
            var files = context.AdditionalFiles
                .Select(x => x.Path)
                .Select(Path.GetFullPath)
                .Where(x =>
                {
                    var fi = new FileInfo(x);
                    return fi.Directory!.Name.Equals(DirectoryName, StringComparison.OrdinalIgnoreCase);
                })
                .Where(x => x.EndsWith(".md", StringComparison.OrdinalIgnoreCase))
                .ToList();

            var classes = new List<string>(files.Count);

            foreach (var file in files)
            {
                var (className, fileName, sourceText) = GenerateClass(file);
                context.AddSource(fileName, sourceText);

                classes.Add($"new {className}()");
            }

            var (managerFileName, managerSourceText) = GenerateManagerClass(classes);
            context.AddSource(managerFileName, managerSourceText);
        }

        protected IDictionary<string, string> ParseYamlInMarkdown(string contents, string file)
        {
            var document = Markdown.Parse(contents, Pipeline);

            var yamlBlock = (YamlFrontMatterBlock?) document.FirstOrDefault(x => x is YamlFrontMatterBlock);
            if (yamlBlock == null)
                throw new Exception($"Found no YamlFrontMatterBlock in File \"{file}\"");

            var yamlContent = yamlBlock.Lines.ToSlice().ToString();

            var input = new StringReader(yamlContent);
            var yaml = new YamlStream();
            yaml.Load(input);

            var mapping = (YamlMappingNode)yaml.Documents[0].RootNode;

            var keys = mapping.Children.Select(x => x.Key)
                .Where(x => x is YamlScalarNode)
                .Cast<YamlScalarNode>()
                .ToList();

            return keys
                .Select(x => (x.Value, mapping.Children[x]))
                .Where(x => x.Item2 is YamlScalarNode)
                .Select(x => (key: x.Value, value: ((YamlScalarNode)x.Item2).Value))
                .Where(x => x.key != null && x.value != null)
                .Select(x => (key: x.key!, value: x.value!))
                .ToDictionary(x => x.key, x => x.value, StringComparer.OrdinalIgnoreCase);
        }
    }
}
