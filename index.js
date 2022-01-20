
const fs = require('fs');
const utils = require('./src/utils');
const config = require('./config');
const port = config.port;
const makeApp = require('./src/app').makeApp;
const handler = require('./src/handlers/hello-world-handler');

const pack = JSON.parse(fs.readFileSync('./package.json'));
const APPNAME = pack.name;

// ------------------------------------------------------------

// clear output directory according to a given interval
utils.clearDirectory(config.outputDir, config.clearIntervalSecs);

let appConfig = Object.assign(config, {
  app: {
    name: APPNAME,
    version: pack.version
  },
  handler

});

const app = makeApp(appConfig);

// start server
app.listen(port, () => {
  console.log('\n\n');
  console.log(APPNAME);
  console.log(`listening at http://localhost:${port}\n`);
  console.log('config options:');
  console.log(appConfig);
});
