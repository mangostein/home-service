const config = require('config');
const Example = require('../api/example');
const ErrorHandler = require('../lib/error-handler');
const logger = require('../lib/logger')(config);

module.exports = function(app) {
    app.get("/test", function(req, res){
      logger.info('test')
      res.send("test");
    });

  app.get("/api/example/:exampleId", function(req, res) {
    Example.getExample(req.params.exampleId)
    .then((results) => res.json(results))
    .catch((err) => ErrorHandler.respondWithError(res, err));
  });
}
