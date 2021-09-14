#nullable enable
using Markdig;
using Markdig.Extensions.AutoIdentifiers;
using Markdig.Extensions.AutoLinks;
using Microsoft.AspNetCore.Components;

namespace Wabbajack.Web.Utils
{
    public static class MarkdownUtils
    {
        private static readonly MarkdownPipeline MarkdownPipeline = new MarkdownPipelineBuilder()
            .UseAutoLinks(new AutoLinkOptions
            {
                UseHttpsForWWWLinks = true,
                OpenInNewWindow = true
            })
            .UseAutoIdentifiers(AutoIdentifierOptions.GitHub)
            .Build();

        public static MarkupString MarkdownToMarkupString(string? markdown)
        {
            // TODO: fix links
            // TODO: fix anchors
            if (markdown == null) return new MarkupString(string.Empty);
            return new MarkupString(Markdown.ToHtml(markdown, MarkdownPipeline));
        }
    }
}
