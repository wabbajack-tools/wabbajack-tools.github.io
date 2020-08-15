const fs = require('fs');
const axios = require('axios');
const _ = require('underscore');

function getGitHubDownloadLink(cb) {
  return axios
    .get('https://api.github.com/repos/wabbajack-tools/wabbajack/releases')
    .then((res) => res.data)
    .then((data) => {
      if (data) {
        if (data.length == 0) {
          cb(new Error(`Data length: ${data.length}`));
        } else {
          const assets = data[0].assets;
          if (assets) {
            if (assets.length == 0) {
              cb(new Error(`Assets length: ${assets.length}`));
            } else {
              const asset = _.find(assets, (x) => {
                return x.name === 'Wabbajack.exe';
              });
              if (asset) {
                const url = asset.browser_download_url;
                try {
                  fs.unlinkSync('.env.local');
                } catch (e) {}
                fs.writeFileSync('.env.local', `WABBAJACKEXE=${url}`);
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
    .catch((err) => {
      console.log(err);
      cb(new Error(err));
    });
}

exports.default = getGitHubDownloadLink;
