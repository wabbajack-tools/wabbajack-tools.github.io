# Contributing

## Requirements

- [Git](https://git-scm.com/)
- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- IDE: [Visual Studio](https://visualstudio.microsoft.com/) or [JetBrains Rider](https://www.jetbrains.com/rider/)
- [Node.js](https://nodejs.org/en/) (for Tailwind CSS)

### Getting Started

- Create a new fork
- Clone the fork using `git clone`
- open the terminal in the `Wabbajack.Web` folder and run `npm install`

### Watch for changes

For the full experience open two terminal windows and run these commands:

1) `dotnet watch --project Wabbajack.Web/Wabbajack.Web.csproj` in the root folder
2) `npm run watch` in the `Wabbajack.Web` folder

I suggest using a Chromium based browser like Chrome or Edge, I've had issues with Firefox and Chromium browsers have better development tools.
