using System;
using System.Net.Http;
using System.Threading.Tasks;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Wabbajack.DTOs;
using Wabbajack.DTOs.JsonConverters;
using Wabbajack.DTOs.Logins;
using Wabbajack.Networking.Http.Interfaces;
using Wabbajack.Networking.WabbajackClientApi;
using Wabbajack.RateLimiter;
using Wabbajack.VFS;
using Wabbajack.Web.Pages.Gallery;
using Wabbajack.Web.Services;

namespace Wabbajack.Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");
            builder.RootComponents.Add<HeadOutlet>("head::after");
            var services = builder.Services;

            // Singleton instead of default Scoped so we can use it in other Singletons
            services.AddSingleton(_ => new HttpClient
            {
                BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
            });

            services.AddBlazoredLocalStorageAsSingleton(s =>
            {

            });

            services.AddAllSingleton<IResource, IResource<HttpClient>>(s => new Resource<HttpClient>("HTTP", 4));
            services.AddAllSingleton<IResource, IResource<Client>>(s => new Resource<Client>("Wabbajack Client", 4));
            //services.AddAllSingleton<IResource, IResource<FileHashCache>>(s => new Resource<FileHashCache>("File Hash", 4));

            services.AddSingleton<ITokenProvider<WabbajackApiState>, WabbajackApiStateProvider>();

            services.AddWabbajackClient();
            services.AddSingleton<IStateContainer, StateContainer>();

            // states of pages
            services.AddSingleton<GalleryState>();

            // Wabbajack.DTO
            services.AddDTOConverters();
            services.AddDTOSerializer();

            builder.Logging.SetMinimumLevel(builder.HostEnvironment.IsDevelopment()
                ? LogLevel.Trace
                : LogLevel.Information);

            await builder.Build().RunAsync();
        }
    }
}
