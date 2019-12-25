/* eslint-disable node/no-extraneous-import */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const fs = require('fs');

// create folder if not exists
fs.mkdirSync(path.join(__dirname, 'api', 'cache'), { recursive: true });

// create server
const app = express();

// server the client as static ressources
app.use(express.static(path.join(__dirname, '/dist/')));

app.use('/api/status.json', require('./api/status').router);

// redirect every non handled requests to the static ressources
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// start the server
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
