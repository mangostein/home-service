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
      res.sendFile('styles.css', { root:  rootLocation + '/client/build' });
    });

    app.get('/service-worker.js', function(req, res) {
      res.sendFile('service-worker.js', { root:  rootLocation + '/client/build' });
    });

    app.get('/main.16c4450d.js', function(req, res) {
      res.sendFile('main.16c4450d.js', { root:  rootLocation + '/client/build/static/js' });
    });
}
