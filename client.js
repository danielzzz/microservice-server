const config = require('./config');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');

async function testHelloWorld () {
  let form = new FormData();
  form.append('name', 'daniel');
  let url = config.publicURL + '/process';

  let res = await axios.post(url, form, {
    headers: form.getHeaders()
  });
  console.log(res.data);
  /* if (!res.data.error) {
  // fs.writeFileSync(config.outputPath, res.data);
    res.data.files.forEach(async url => {
      let result = await axios.get(url, {
        responseType: 'arraybuffer'
      });
      console.log(result.headers);
      let fileName = outputPath || result.headers['content-disposition']?.split('filename=')[1] || 'defaultoutput.docx';
      fs.writeFileSync(path.join('./testdata/', fileName), result.data);
    });
  } */
}

// test hello world file handler
async function testHelloWorldFile () {
  let form = new FormData();
  form.append('name', 'daniel');
  let url = config.publicURL + '/process';

  let res = await axios.post(url, form, {
    headers: form.getHeaders()
  });
  console.log(res.data);
  if (!res.data.error) {
    let url = res.data.data.url;
    let result = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    console.log(result.headers);
    let fileName = result.headers['content-disposition']?.split('filename=')[1] || 'defaultoutput.docx';
    console.log(fileName);
    fs.writeFileSync(path.join('./', fileName), result.data);
  }
}

testHelloWorldFile();
