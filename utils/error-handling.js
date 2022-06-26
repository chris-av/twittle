const util = require('util');

module.exports = function(err) {
  if (Object.keys(err).includes('isAxiosError')) {
    const { message } = err;
    const { status, statusText } = err.response;
    const { baseURL, url, method, headers, data } = err.response.config;

    console.log('Received Axios error');
    console.log('');
    console.log('');

    console.log(`status : ${status}`);
    console.log(`status text : ${statusText}`);
    console.log(message);
    console.log('');
    console.log('');

    console.log('request : ');
    console.log(`base url : ${baseURL}`)
    console.log(`endpoing : ${url}`)
    console.log(`method : ${method}`);
    console.log(`header:`);
    Object.keys(headers).forEach(key => {
      console.log(`\t${key} : ${headers[key]}`);
    });
    console.log('body : ');
    console.log(data);

    console.log('');
    console.log('');

    console.log('response : ');
    console.log(util.inspect(err.response.data, { depth: null, colors: true }));

    console.log('');
    console.log('');

  } else if (Object.keys(err).includes('errors')) {
    console.log('Twitter error');
    console.log('');
    err.errors.forEach(e => {
      const { title, type, detail, value } = e;
      console.log(`title:\t${title}`);
      console.log(`type:\t${type}`);
      console.log(`detail:\t${detail}`);
      console.log('');
      console.log('');
    });
  } else {
    console.log('unknown error');
    console.log(err);
  }
  
}
