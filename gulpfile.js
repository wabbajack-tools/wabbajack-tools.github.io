const { series, src, dest } = require('gulp');
const fs = require('fs');
const axios = require('axios');
const _ = require('underscore');
const { exec } = require('child_process');

function getExeLink(data, cb, file) {
  if (data.length < 1) {
    cb(new Error(`Data length: ${data.length}`));
  } else {
    const url = data[0].assets_url;
    if (url) {
      axios
        .get(url)
        .then((res) => res.data)
        .then((assetsData) => {
          if (assetsData) {
            if (assetsData.length < 1) {
              cb(new Error(`Assets Data length: ${assetsData.length}`));
            } else {
              const exe = _.find(assetsData, (asset) => {
                return asset.name === 'Wabbajack.exe';
              });
              if (exe) {
                const downloadURL = exe.browser_download_url;
                try {
                  fs.unlinkSync('.env.local');
                } catch (e) {}
                fs.writeFileSync(
                  '.env.local',
                  `REACT_APP_WABBAJACKEXE=${downloadURL}`
                );
                cb();
              } else {
                cb(
                  new Error(
                    `Unable to find Wabbajack.exe asset in ${assetsData}`
                  )
                );
              }
            }
          } else {
            cb(new Error('Assets Data is undefined!'));
          }
        })
        .catch((err) => {
          cb(new Error(err));
        });
    } else {
      cb(new Error(`Unable to find assets url for data: ${data}`));
    }
  }
}

function getGitHubDownloadLink(cb, file) {
  return axios
    .get('https://api.github.com/repos/wabbajack-tools/wabbajack/releases')
    .then((res) => res.data)
    .then((data) => {
      if (data) {
        return getExeLink(data, cb, file);
      } else {
        cb(new Error('Data is undefined!'));
      }
    })
    .catch((err) => {
      console.log(err);
      cb(new Error(err));
    });
}

exports.default = getGitHubDownloadLink;
