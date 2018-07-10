const config = require('config');
const Example = require('../api/example');
const ErrorHandler = require('../lib/error-handler');
const logger = require('../lib/logger')(config);

const rootLocation = process.cwd().replace('/home-service', '');

module.exports = function(app) {
    app.get('/', function(req, res) {
      res.sendFile('index.html', { root:  rootLocation + '/client/build' });
    });

    app.get('/styles.css', function(req, res) {
      res.sendFile('style.css', { root:  rootLocation + '/client/build' });
    });
}
