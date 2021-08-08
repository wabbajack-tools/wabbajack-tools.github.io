using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MudBlazor.Services;
using Wabbajack.DTOs.JsonConverters;
using Wabbajack.Web.Services;

namespace Wabbajack.Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            // Singleton instead of default Scoped so we can use it in other Singletons
            builder.Services.AddSingleton(_ => new HttpClient
            {
                BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
            });
            builder.Services.AddSingleton<IStateContainer>(provider => new StateContainer(
                provider.GetRequiredService<HttpClient>(),
                provider.GetRequiredService<IEnumerable<JsonConverter>>())
            );

            // Wabbajack.DTO
            builder.Services.AddDTOConverters();
            // TODO: builder.Services.AddDTOSerializer();

            //MudBlazor
            builder.Services.AddMudServices();

            builder.Logging.SetMinimumLevel(builder.HostEnvironment.IsDevelopment()
                ? LogLevel.Debug
                : LogLevel.Information);

            await builder.Build().RunAsync();
        }
    }
}
