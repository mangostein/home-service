const config = require('config');
const logger = require('./lib/logger')(config);
const url = require('url');
const express = require('express');
const path = require('path');

let app = require('express')();
let webServer = require('./lib/web-server');

if (config.has('env')) {
  Object.assign(process.env, config.get('env'));
}

require('./app.js')(app);

app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

webServer(app, config).then(() => {
  const SERVER_CONF = config.get("server");
  logger.info(`Listening on ${url.format(SERVER_CONF)}`);
})
.catch((err) => {
  logger.error(err);
});
