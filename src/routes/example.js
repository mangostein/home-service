const config = require('config');
const Example = require('../api/example');
const ErrorHandler = require('../lib/error-handler');

module.exports = function(app) {
  app.get("/api/example/:exampleId", function(req, res) {
    Example.getExample(req.params.exampleId)
    .then((results) => res.json(results))
    .catch((err) => ErrorHandler.respondWithError(res, err));
  });
}
