const findRemoveSync = require('find-remove');

// makes the json response
function makeResponse (data, message = 'the action has executed with success', error = false) {
  return {
    error,
    message,
    data
  };
}

// makes the json exception response
function makeExceptionResponse (e) {
  return makeResponse(e, e.message, true);
}

// clears directory at a give interval
function clearDirectory (path, intervalSecs, options) {
  options = Object.assign({
    age: { seconds: intervalSecs },
    ignore: '.gitempty'
    // extensions: ['.*']
  }, options);
  // console.log('setting up clearing of the upload directory');
  // console.log(`dir: ${path}`);
  // console.log(`interval ${intervalSecs} seconds`);

  const interval = setInterval(() => {
    // console.log('clearing old files');
    findRemoveSync(path, options);
  }, intervalSecs * 1000);
  // console.log(options);

  return interval;
}

// converts files array to a hashmap
function getFiles (filesArr) {
  let files = {};

  if (!filesArr) {
    return files;
  }

  filesArr.forEach(file => {
    files[file.fieldname] = file;
  });
  return files;
}

// make hash
function hash (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed; let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

module.exports = {
  makeResponse,
  makeExceptionResponse,
  clearDirectory,
  getFiles,
  hash
};
