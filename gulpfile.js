const { src, dest, series } = require('gulp');
const run = require('gulp-run');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

function webpackBuild(cb) {
  return run('yarn build').exec();
}

function copyExtras(cb) {
  const assets = path.join(__dirname, 'src', 'assets');
  return src([
    path.join(assets, 'html', '404.html'),
    path.join(assets, 'other', 'CNAME'),
    path.join(__dirname, 'README.md'),
    path.join(__dirname, 'LICENSE.txt')
  ]).pipe(dest(path.join(__dirname, 'dist')));
}

function ghDeploy(cb) {
  return run('yarn run publish').exec();
}

exports.deploy = series(webpackBuild, copyExtras, ghDeploy);
