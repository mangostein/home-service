const config = require('config');
const logger = require('./logger')(config);

let ErrorHandler = {};

ErrorHandler.respondWithError = function(res, error) {
  let code = 500;
  let msg = "Unknown error";

  if (error && typeof(error) == 'string') {
    msg = error;
  }

  if (error && typeof(error) == 'object') {
    let errorCode = parseInt(error.code);
    code = errorCode ? errorCode : code;
    msg = error.message;
  }

  logger.error("Error", code, msg);

  res.status(code).send(msg);
}

module.exports = ErrorHandler;
