const request = require('supertest');
const fs = require('fs');

const makeApp = require('../src/app').makeApp;
const handler = require('../src/handlers/hello-world-handler');
const config = require('../config');

const pack = JSON.parse(fs.readFileSync('./package.json'));
const APPNAME = pack.name;

let appConfig = Object.assign(config, {
  app: {
    name: APPNAME,
    version: pack.version
  },
  handler

});
const app = makeApp(appConfig);

describe('test hello world handler', () => {
  test('process should be working', async () => {
    const data = { name: 'dan' };
    const result = await request(app).post('/process').send(data);

    expect(result.statusCode).toBe(200);
    const body = result.body;
    expect(body.error).toBe(false);
    expect(body.message).toBe('hello ' + data.name);
  });
});
