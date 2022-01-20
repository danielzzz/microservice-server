const request = require('supertest');
const fs = require('fs');

const makeApp = require('../src/app').makeApp;
const handler = require('../src/handlers/hello-world-file-handler');
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

describe('test api', () => {
  test('home page', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toBe(200);
    const body = result.body;
    expect(body.error).toBe(false);
    expect(JSON.stringify(body.data)).toBe(JSON.stringify(appConfig.app));
  });

  test('process should be working', async () => {
    const data = { name: 'dan' };
    const result = await request(app).post('/process').send(data);

    expect(result.statusCode).toBe(200);
    const body = result.body;
    expect(body.error).toBe(false);
  });

  test('file download', async () => {
    const content = 'hello world';
    fs.writeFileSync(appConfig.outputDir + '/test.txt', content);

    const result = await request(app).get('/get_file?file=test.txt');
    expect(result.statusCode).toBe(200);
    // console.log(result.headers);
    expect(result.headers['content-type']).toBe('text/plain; charset=UTF-8');
    expect(parseInt(result.headers['content-length'])).toBe(content.length);
  });
});
