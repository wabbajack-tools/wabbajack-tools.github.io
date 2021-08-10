using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Wabbajack.Web.Posts;

namespace Wabbajack.Web.Services
{
    public interface IPostManager
    {
        public IReadOnlyList<IPost> Posts { get; }

        public bool TryGetPost(Guid id, [MaybeNullWhen(false)] out IPost post);
    }
}
