const config = require('config');
const logger = require('../../lib/logger')(config);

module.exports = function(exampleId) {
  logger.info('HERE IT IS', exampleId);
  return Promise.resolve('done');
}
