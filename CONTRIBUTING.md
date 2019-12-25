# Contributing

## Requirements

1. [Node](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/lang/en/)
3. [VS Code](https://code.visualstudio.com)
4. The recommended VS extensions (see `.vscode/extensions.json`)

## Installing

1. Fork the repository
2. Clone the forked repository `git clone https://github.com/your-name/wabbajack.org.git`
3. Switch to the code branch `git checkout code`
4. Download all node modules `yarn install`
5. Create a new branch `git branch some-name`

## Keeping your fork updated

1. Add this repository as a new remote `git remote add upstream https://github.com/wabbajack-tools/wabbajack.org.git`
2. Make sure to be on the `code` branch `git checkout code`
3. Fetch the changes `git fetch upstream`
4. Rebase `git rebase upstream/master`
5. If your other branch needs updating `git checkout branch-name && git rebase master`

## Project structure

This project has **two** sub-projects. You have the server `express.js` and the client `src/index.js`. The server is powered by [Express](https://expressjs.com/) and the client uses [React](https://reactjs.org) + [Redux Zero](https://github.com/redux-zero/redux-zero) + [Material-UI](https://material-ui.com/).

### Working on the server

Start the server by running `yarn start`. This will start [nodemon](https://nodemon.io/) (see `nodemon.json` for the config) and run the epxress server at `localhost:3000` if the environment variable `PORT` is not set. We serve the client as a static ressource which is why `yarn build` is called before starting the server so that the `dist` folder gets populated with the client.

### Working on the client

For the client we use [webpack](https://webpack.js.org/) for bundling, [Babel](https://babeljs.io/) for compiling, [ESLint](https://eslint.org/) for linting and [Jest](https://jestjs.io/) for unit testing. You can start the webpack dev server by running `yarn run dev`.

You should take a look at aliases declared in `webpack.config.client.js` as they are used everywhere.

We have opted to use `redux-zero` instead of normal `redux` due to the reduced boilerplate code needed. You can view the store and actions in the `src/store` folder.

#### Folder structure

(root is `src/`)

| Folder        | Alias         | Contents |
|---|---|---|
| `assets`      | `Assets`      | Contains all non-code assets like html, css or image files. Each file category gets its own subfolder |
| `components`  | `Components`  | Contains all React components. Every component gets its own folder. Components that are being used only by another component will be placed in the same folder (see `Footer` and `FooterItem`) |
| `sections`    | `Sections`    | Contains all Sections. Sections are the top level components being rendered when accessing a specific route. |
| `store`       | none          | Contains the `redux-zero` store and actions |
| `utils`       | `Utils`       | Contains utility functions |
