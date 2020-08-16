import * as fs from 'fs';
import { Gulpclass, Task, SequenceTask, MergedTask } from 'gulpclass';
import axios from 'axios';
import { src, dest } from 'gulp';
import _ from 'underscore';
import * as del from 'del';

@Gulpclass()
export class Gulpfile {
  @Task('clean')
  clean() {
    return del('dist/**');
  }

  @Task('copyPublicFiles')
  copyPublicFiles() {
    return src('./src/public/CNAME')
      .pipe(src('./src/public/404.html'))
      .pipe(dest('./dist/'));
  }

  @Task('getGitHubDownloadLink')
  async getGitHubDownloadLink() {
    try {
      const res = await axios.get(
        'https://api.github.com/repos/wabbajack-tools/wabbajack/releases'
      );
      const data = res.data;
      if (data) {
        if (data.length == 0) {
          return Promise.reject(`Data length: ${data.length}`);
        } else {
          const assets = data[0].assets;
          if (assets) {
            if (assets.length == 0) {
              return Promise.reject(`Assets length: ${assets.length}`);
            } else {
              const asset = _.find(assets, (x: any) => {
                return x.name === 'Wabbajack.exe';
              });
              if (asset) {
                const url = asset.browser_download_url;
                try {
                  fs.unlinkSync('.env.local');
                } catch (e) {}
                fs.writeFileSync('.env.local', `WABBAJACKEXE=${url}`);
                console.log(`Found URL: ${url}`);
                return Promise.resolve(`Found URL: ${url}`);
              } else {
                return Promise.reject(
                  `Unable to find Wabbajack.exe in ${assets}!`
                );
              }
            }
          } else {
            return Promise.reject('Assets is undefined!');
          }
        }
      } else {
        return Promise.reject('Data is undefined!');
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  @SequenceTask('default')
  defaultTask() {
    return ['getGitHubDownloadLink', 'copyPublicFiles'];
  }

  @SequenceTask('cleanAndDownload')
  cleanAndDownload() {
    return ['clean', 'getGitHubDownloadLink'];
  }

  @SequenceTask('build')
  buildTask() {
    return ['cleanAndDownload', 'copyPublicFiles'];
  }
}

/*const fs = require('fs');
const axios = require('axios');
const _ = require('underscore');
const { parallel, series, src, dest } = require('gulp');
const del = require('del');*/

/*function getGitHubDownloadLink(cb: any) {
  return axios
    .get('https://api.github.com/repos/wabbajack-tools/wabbajack/releases')
    .then((res: any) => res.data)
    .then((data: any) => {
      if (data) {
        if (data.length == 0) {
          cb(new Error(`Data length: ${data.length}`));
        } else {
          const assets = data[0].assets;
          if (assets) {
            if (assets.length == 0) {
              cb(new Error(`Assets length: ${assets.length}`));
            } else {
              const asset = _.find(assets, (x: any) => {
                return x.name === 'Wabbajack.exe';
              });
              if (asset) {
                const url = asset.browser_download_url;
                try {
                  fs.unlinkSync('.env.local');
                } catch (e) {}
                fs.writeFileSync('.env.local', `WABBAJACKEXE=${url}`);
                console.log(`Found URL: ${url}`);
                cb();
              } else {
                cb(new Error(`Unable to find Wabbajack.exe in ${assets}!`));
              }
            }
          } else {
            cb(new Error('Assets is undefined!'));
          }
        }
      } else {
        cb(new Error('Data is undefined!'));
      }
    })
    .catch((err: any) => {
      console.log(err);
      cb(new Error(err));
    });
}

function cleanDist() {
  return del('dist/**');
}

function copyPublicFiles() {
  return src('./src/public/CNAME')
    .pipe(src('./src/public/404.html'))
    .pipe(dest('./dist/'));
}

exports.clean = cleanDist;
exports.build = series(
  parallel(cleanDist, getGitHubDownloadLink),
  copyPublicFiles
);
exports.default = parallel(getGitHubDownloadLink, copyPublicFiles);
exports.getGitHubDownloadLink = getGitHubDownloadLink;
*/
