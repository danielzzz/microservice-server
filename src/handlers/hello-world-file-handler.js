const utils = require('../utils');
const fs = require('fs');
const path = require('path');
require('path-join-safe');

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

  // make a test file and store in the output
  // this could simmulate some kind of processor
  const content = 'hello ' + body.name;

  // create a random file name
  const fileName = utils.hash(body.name) + '.txt';
  fs.writeFileSync(path.posix.joinSafe(appConfig.outputDir, fileName), content);

  // prepare response
  const data = {
    url: appConfig.publicURL + '/get_file?file=' + fileName
  };
  return utils.makeResponse(data, 'your file is ready');
}

module.exports = handler;
