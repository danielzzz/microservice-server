const fs = require('fs');
const utils = require('../src/utils');
const config = require('../config');
const path = require('path');
const findRemoveSync = require('find-remove');

jest.useFakeTimers();

describe('test api', (done) => {
  test('make response', () => {
    const expected = {
      error: false,
      message: 'hello world',
      data: { foo: 'bar' }
    };

    const result = utils.makeResponse(expected.data, expected.message);
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  test('make exception response', () => {
    let expected;

    try {
      throw ({ message: 'some error' }); // eslint-disable-line
    } catch (e) {
      // console.log('error thrown');
      expected = {
        error: true,
        message: e.message,
        data: e
      };

      const result = utils.makeExceptionResponse(e);
      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    }
  });

  test('clear dir', async () => {
    // console.log(path.resolve(config.outputDir));
    const testPath = config.outputDir + '/test.txt';
    fs.writeFileSync(testPath, 'test file content');
    expect(fs.existsSync(testPath)).toBe(true);

    const interval = utils.clearDirectory(config.outputDir, 1, { files: '*.*', ignore: '.gitignore' });
    jest.advanceTimersByTime(2000);
    expect(fs.existsSync(testPath)).toBe(false);

    clearInterval(interval);
  });
});
