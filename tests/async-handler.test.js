const request = require('supertest');
const fs = require('fs');

const makeApp = require('../src/app').makeApp;
const handler = require('../src/handlers/hello-world-file-handler-async');
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

const axios = require('axios');
jest.mock('axios');

describe('test api', () => {
  test('async processing', async () => {
    jest.useFakeTimers();

    // here we should get the immediate response
    const data = {
      name: 'dan',
      callbackURL: 'http://myserver123123.com/callbackURL'
    };
    const result = await request(app).post('/process').send(data);
    expect(result.statusCode).toBe(200);
    const body = result.body;
    expect(body.error).toBe(false);
    expect(body.message).toBe('your request was registered correctly and will be processed shortly');

    // now we check if our async callback was called
    axios.post.mockResolvedValueOnce({ error: false, data: { message: 'hello dan' } });

    jest.advanceTimersByTime(10000);

    const expectedResponse = { data: { msg: 'hello dan' }, error: false, message: 'your request was performed correctly' };
    expect(axios.post).toHaveBeenCalledWith(data.callbackURL, expectedResponse);
  });
});
