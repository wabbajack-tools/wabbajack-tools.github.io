# Contributing

## Requirements

(check the required version numbers in the [`package.json`](package.json) file under `engines`)

1. [Node](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/lang/en/)
3. [VS Code](https://code.visualstudio.com)
4. The recommended VS extensions (see [`.vscode/extensions.json`](.vscode/extensions.json))

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

## Used libraries and frameworks

The website uses [React](https://reactjs.org/)+[Mobx 5](https://mobx.js.org)(+[Mobx-React](https://mobx-react.js.org/))+[Router5](https://router5.js.org/) with [TypeScript 3.9](https://www.typescriptlang.org/)+[Babel 7](https://babeljs.io/) and [Parcel 1](https://parceljs.org/) for building.

This is a bit different from your usual [Create React App](https://create-react-app.dev/) setup with React+Redux but I started to hate Redux very early on an found Mobx to be easier to work with.

[Material-UI](https://material-ui.com/) is the UI framework, [Jest](https://jestjs.io/) is used for testing and [ESLint](https://eslint.org/) for linting.
