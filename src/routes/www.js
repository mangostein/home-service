const config = require('config');
const Example = require('../api/example');
const ErrorHandler = require('../lib/error-handler');
const logger = require('../lib/logger')(config);

module.exports = function(app) {
    app.get('/', function(req, res) {
      res.sendFile('index.html', { root: process.cwd() + '/www' });
    });
}
