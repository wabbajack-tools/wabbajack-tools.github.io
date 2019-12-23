/* eslint-disable node/no-extraneous-import */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/dist/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
