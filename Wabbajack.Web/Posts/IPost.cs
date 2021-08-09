using System;

namespace Wabbajack.Web.Posts
{
    public interface IPost
    {
        public DateTime Date { get; }

        public string Markdown { get; }

        // TODO: name
    }
}
