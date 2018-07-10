const compression = require('compression');
const config = require('config');
const bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.get('Access-Control-Allow-Origin'));
    res.header("Access-Control-Allow-Methods", config.get('Access-Control-Allow-Methods'));
    res.header("Access-Control-Allow-Headers", config.get('Access-Control-Allow-Headers'));
    next();
  });
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({
    limit: '15mb'
  }));
  app.disable('etag');

  require('./routes/example')(app);
  require('./routes/build')(app);
}
