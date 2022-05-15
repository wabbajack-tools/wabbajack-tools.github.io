using System;
using System.Threading.Tasks;
using Blazored.LocalStorage;
using Microsoft.Extensions.Logging;
using Wabbajack.DTOs.JsonConverters;
using Wabbajack.DTOs.Logins;
using Wabbajack.Hashing.xxHash64;

namespace Wabbajack.Web.Services;

public class WabbajackApiStateProvider : LocalStorageToken<WabbajackApiState>
{
    public WabbajackApiStateProvider(ILogger<WabbajackApiStateProvider> logger, ILocalStorageService storage, DTOSerializer dtos) : base(logger, storage, dtos, "wabbajack-api")
    {

    }

    public override async ValueTask<WabbajackApiState> Get()
    {
        if (await _storage.ContainKeyAsync(_key))
        {
            return await base.Get();
        }
        else
        {
            var random = new Random();

            var bytes = new byte[64];
            random.NextBytes(bytes);
            var state = new WabbajackApiState
            {
                MetricsKey = bytes.ToHex()

            };
            await base.SetToken(state);
            return state;
        }
    }

}
