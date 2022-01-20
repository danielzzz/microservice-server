const utils = require('../utils');
const fs = require('fs');
const path = require('path');
require('path-join-safe');
const axios = require('axios');

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

  if (!body.callbackURL) {
    return utils.makeResponse(null, 'callbackURL not set', true);
  }

  // execute async processing without blocking
  process(body);

  // send response
  return utils.makeResponse({}, 'your request was registered correctly and will be processed shortly');
}

// this function simmulates async processing
async function process (data) {
  setTimeout(async () => {
    const content = 'hello ' + data.name;
    const response = utils.makeResponse({ msg: content }, 'your request was performed correctly', false);
    try {
      await axios.post(data.callbackURL, response);
    } catch (e) {
      console.log('async request error');
      console.log(e.message);
    }
  }, 5000);
}

module.exports = handler;
