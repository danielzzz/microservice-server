const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });
require('path-join-safe');
const path = require('path');

const utils = require('./utils');

function makeApp (appConfig) {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set('json spaces', 4);

  /**
   * return server info
   */
  app.get('/', (req, res) => {
    let output;
    try {
      output = appConfig.app.name + ' v' + appConfig.app.version;
    } catch (e) {
      output = e.message;
      return res.status(500).json(utils.makeExceptionResponse(e));
    }
    return res.json(utils.makeResponse(appConfig.app, output));
  });

  app.post('/process', upload.any(), (req, res) => {
    let responseMessage;
    try {
      const files = utils.getFiles(req.files);

      const handlerConfig = {
        req,
        res,
        files
      };
      // console.log(files);
      responseMessage = appConfig.handler(appConfig, handlerConfig);
    } catch (e) {
      console.log(e);
      const data = {
        headers: req.headers,
        body: req.body,
        files: req.files,
        error: e.trace
      };
      responseMessage = utils.makeResponse(data, e.message, true);
    }

    return res.json(responseMessage);
  });

  app.get('/get_file', (req, res) => {
    const fileName = req.query.file;
    const filePath = path.joinSafe(appConfig.outputDir, fileName);
    if (!filePath) {
      const response = utils.makeResponse({}, 'file is not available', true);
      return res.json(response);
    }

    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.sendFile(path.resolve(filePath));
  });

  return app;
}

module.exports = {
  makeApp
};
