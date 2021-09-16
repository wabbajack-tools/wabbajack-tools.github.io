using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Wabbajack.Web.Posts;

namespace Wabbajack.Web.Services
{
    public interface IPostManager
    {
        public IReadOnlyList<IPost> Posts { get; }

        public bool TryGetPost(Guid id, [MaybeNullWhen(false)] out IPost res);
    }

    //public partial class PostManager : IPostManager { }
}

namespace Wabbajack.Web.Posts
{
    public interface IPost
    {
        public Guid Id { get; }

        public string Title { get; }

        public string Author { get; }

        public DateTime Date { get; }

        public string Markdown { get; }
    }
}
