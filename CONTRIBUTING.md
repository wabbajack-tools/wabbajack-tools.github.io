# Contributing

## Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
- IDE: [VS Code](https://code.visualstudio.com/), [WebStorm](https://www.jetbrains.com/webstorm/), or any other editor of your choice.

## Getting Started

1. Create a new fork of the repository.
2. Clone your fork using `git clone`.
3. Open a terminal in the project root folder.
4. Run `npm install` to install dependencies.

## Local Development

To start the development server with hot-reload:

```bash
npm run dev
```

The website will be available at `http://localhost:5173` (or the port shown in your terminal).

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for code style and potential errors.
- `npm run preview`: Locally previews the production build.
- `npm run generate-routes`: Generates TanStack Router routes.

## Local Testing

Before submitting a pull request, please ensure:
1. The project builds successfully: `npm run build`
2. There are no linting errors: `npm run lint`
3. If you changed routes, ensure they are correctly generated: `npm run generate-routes`

We recommend using a Chromium-based browser (Chrome, Edge) for development as they have robust developer tools.
