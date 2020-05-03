# Contributing

## Requirements

(check the required version numbers in the `package.json` file under `engines`)

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

## Used libraries and frameworks

This website was build on a [CRA](https://create-react-app.dev/) template featuring [TypeScript](https://www.typescriptlang.org/), [Redux](https://redux.js.org/) and, of course, [React](https://reactjs.org/). CRA does a lot for us with the react-scripts so we don't have to worry about configuring [babel](https://babeljs.io/), [webpack](https://webpack.js.org/) or [jest](https://jestjs.io/).

That being said, [jest](https://jestjs.io/) is used with [enzyme](https://github.com/enzymejs/enzyme) to test react components and other functionalities. You can generate a coverage report with `yarn run coverage`.
