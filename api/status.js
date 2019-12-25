/* eslint-disable node/no-extraneous-require */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const statusLink = 'http://build.wabbajack.org/lists/status.json';

router.use('/', (req, res) => {
  console.log('Getting status from build server');
  axios
    .get(statusLink)
    .then(response => response.data)
    .then(status => res.json(status));
});

module.exports = {
  router
};
