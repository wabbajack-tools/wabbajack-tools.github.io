using System.Collections.Generic;
using Wabbajack.Web.Posts;

namespace Wabbajack.Web.Services
{
    public interface IPostManager
    {
        public IReadOnlyList<IPost> Posts { get; }
    }
}
