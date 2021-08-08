using System.Net.Http;
using System.Threading.Tasks;
using Markdig;
using Markdig.Extensions.AutoIdentifiers;
using Markdig.Extensions.AutoLinks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;

namespace Wabbajack.Web.Shared
{
    /// <summary>
    /// Component for rendering Markdown content in Blazor using Markdig
    /// </summary>
    public class MarkdownComponent : ComponentBase
    {
        [Inject]
        public HttpClient HttpClient { get; set; }

        [Parameter]
        public string MarkdownUrl { get; set; }

        private string MarkdownContent { get; set; }

        protected override async Task OnParametersSetAsync()
        {
            await base.OnParametersSetAsync();

            if (MarkdownUrl != null)
                MarkdownContent = await HttpClient.GetStringAsync(MarkdownUrl);
        }

        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            base.BuildRenderTree(builder);
            if (MarkdownContent == null) return;

            var pipeline = new MarkdownPipelineBuilder()
                .UseAutoIdentifiers(AutoIdentifierOptions.GitHub)
                .UseAutoLinks(new AutoLinkOptions
                {
                    OpenInNewWindow = true,
                    UseHttpsForWWWLinks = true
                })
                .Build();

            // TODO: maybe add https://github.com/mganss/HtmlSanitizer
            var markupString = new MarkupString(Markdown.ToHtml(MarkdownContent, pipeline));
            builder.AddContent(0, markupString);
        }
    }
}
