using System;

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
