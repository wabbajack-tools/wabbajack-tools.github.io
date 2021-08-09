using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using Bunit;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using MudBlazor.Services;
using Wabbajack.DTOs;
using Wabbajack.DTOs.JsonConverters;
using Wabbajack.Web.Services;
using Xunit;

namespace Wabbajack.Web.Test.ComponentTests
{
    public abstract class ComponentTest : IDisposable
    {
        protected readonly TestContext Context;

        protected ComponentTest()
        {
            Context = new TestContext();
            Context.JSInterop.Mode = JSRuntimeMode.Loose;

            Context.Services.AddMudServices();
            Context.Services.AddDTOConverters();
        }

        protected IStateContainer SetupStateContainer(bool useModlistMetadata = false)
        {
            var mock = new Mock<IStateContainer>();
            Context.Services.AddSingleton(mock.Object);

            var converters = Context.Services.GetRequiredService<IEnumerable<JsonConverter>>();

            var options = new JsonSerializerOptions
            {
                ReadCommentHandling = JsonCommentHandling.Skip,
                AllowTrailingCommas = true
            };

            foreach (var c in converters) options.Converters.Add(c);

            if (useModlistMetadata)
            {
                Assert.True(File.Exists("_files/modlists.json"));

                var json = File.ReadAllText("_files/modlists.json");
                var res = JsonSerializer.Deserialize<List<ModlistMetadata>>(json, options);

                mock.Setup(x => x.Modlists)
                    .Returns(res);
                mock.Setup(x => x.LoadModlistMetadata())
                    .ReturnsAsync(true);
            }

            return mock.Object;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            Context.Dispose();
        }
    }
}
