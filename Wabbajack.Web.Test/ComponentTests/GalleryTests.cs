using Wabbajack.Web.Pages.Gallery;
using Xunit;

namespace Wabbajack.Web.Test.ComponentTests
{
    public class GalleryTests : ComponentTest
    {
        [Fact]
        public void TestRenderGallery()
        {
            SetupStateContainer(true);
            var cut = Context.RenderComponent<Gallery>();
            Assert.NotNull(cut);
        }
    }
}
