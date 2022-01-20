const utils = require('../utils');

/**
 * this is the core function of the service
 * it will be called when accessed POST server:port/process
 * you can execute your code and return the response to the client
 *
 * @param {object} appConfig
 * application configuration
 *
 * @param {object} handlerConfig
 * handler config object
 * it contains req and res passed from the express api
 *
 * @returns {object} response
 * a response object to be converted to json and returned to the client
 */
function handler (appConfig, handlerConfig) {
  const body = handlerConfig.req.body;

  if (!body.name) {
    return utils.makeResponse(null, 'name not set', true);
  }

  return utils.makeResponse(null, 'hello ' + body.name);
}

module.exports = handler;
