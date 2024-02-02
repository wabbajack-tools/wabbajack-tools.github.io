#nullable enable
using Markdig;
using Markdig.Extensions.AutoIdentifiers;
using Markdig.Extensions.AutoLinks;
using Microsoft.AspNetCore.Components;

namespace Wabbajack.Web.Utils
{
    public static class MarkdownUtils
    {
        private static string _currentUrl = string.Empty;
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
            if (markdown == null) return new MarkupString(string.Empty);
            var urlMarkdown = markdown.Split(null, 2);
            // TODO: fix relative urls
            // TODO: Find a way to jump to anchors on page load
            var htmlString = Markdown.ToHtml(urlMarkdown[1], MarkdownPipeline);
            _currentUrl = urlMarkdown[0];
            htmlString = htmlString.Replace("href=\"#","href=\""+_currentUrl+"#");
            return new MarkupString(htmlString);
        }
    }
}
