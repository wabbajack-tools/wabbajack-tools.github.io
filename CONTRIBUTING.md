# Contributing

## Requirements

1. [Node](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/lang/en/)
3. [VS Code](https://code.visualstudio.com)

## Installing

1. Fork the repository
2. Clone the forked repository `git clone https://github.com/your-name/wabbajack.org.git`
3. Switch to the code branch `git checkout code`
4. Download all node modules `yarn install`
5. Create a new branch `git branch some-name`
6. Start your development server `yarn run dev`

## Keeping your fork updated

1. Add this repository as a new remote `git remote add upstream https://github.com/wabbajack-tools/wabbajack.org.git`
2. Make sure to be on the `code` branch `git checkout code`
3. Fetch the changes `git fetch upstream`
4. Rebase `git rebase upstream/master`
5. If your other branch needs updating `git checkout branch-name && git rebase master`
