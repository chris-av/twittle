const util = require('util');

module.exports = function(err) {
  if (Object.keys(err).includes('errdata')) {
    const { message } = err;
    const { status, statusText } = err.response;
    const { baseURL, url, method, headers, data } = err.response.config;


    const myerrobj = {
      message: message,
      errdata: {
        status: status,
        message: statusText,
        request: {
          url: baseURL,
          endpoint: url,
          method: method,
          headers: headers,
          body: data
        },
        response: err.response.data
      }
    }

    console.log(util.inspect(myerrobj, { depth: null, colors: true }));

  } else {
    console.log(err);
  }
  
}