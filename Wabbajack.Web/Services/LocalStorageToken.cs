using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Blazored.LocalStorage;
using Microsoft.Extensions.Logging;
using Wabbajack.DTOs.JsonConverters;
using Wabbajack.Networking.Http.Interfaces;

namespace Wabbajack.Web.Services;

public class LocalStorageToken<T> : ITokenProvider<T>
{
    private readonly ILogger _logger;
    protected readonly ILocalStorageService _storage;
    protected readonly string _key;
    private readonly DTOSerializer _dtos;

    public LocalStorageToken(ILogger logger, ILocalStorageService storage, DTOSerializer dtos, string key)
    {
        _logger = logger;
        _storage = storage;
        _key = key;
        _dtos = dtos;
    }

    public virtual async ValueTask<T> Get()
    {
        var data = await _storage.GetItemAsync<string>(_key, CancellationToken.None);
        return JsonSerializer.Deserialize<T>(data, _dtos.Options);
    }

    public async ValueTask SetToken(T val)
    {
        var json = JsonSerializer.Serialize(val);
        await _storage.SetItemAsStringAsync(_key, json);
    }

    public async ValueTask<bool> Delete()
    {
        await _storage.RemoveItemAsync(_key);
        return true;
    }

    public bool HaveToken()
    {
        throw new NotImplementedException();
    }
}
