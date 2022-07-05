const util = require('util');
const { Reset, FgRed, Bright, FgYellow } = require('../colors');

module.exports = function(err) {
  if (Object.keys(err).includes('isAxiosError')) {
    const { message } = err;
    const { status, statusText } = err.response;
    const { baseURL, url, method, headers, data } = err.response.config;

    console.log(FgRed + Bright + 'Received Axios error' + Reset);
    console.log('');
    console.log('');

    console.log(`${FgYellow}${Bright}status : ${Reset}${status}`);
    console.log(`${FgYellow}${Bright}status text : ${Reset}${statusText}`);
    console.log(FgRed + message + Reset);
    console.log('');
    console.log('');

    console.log(FgYellow + Bright + 'REQUEST : ' + Reset);
    console.log(`\t${FgYellow}base url : ${Reset}${baseURL}`)
    console.log(`\t${FgYellow}endpoing : ${Reset}${url}`)
    console.log(`\t${FgYellow}method : ${Reset}${method}`);
    console.log(`\t${FgYellow}header:${Reset}`);
    Object.keys(headers).forEach(key => {
      console.log(`\t\t${key} : ${headers[key]}`);
    });
    console.log(FgYellow + Bright + '\tbody : ' + Reset);
    if (data) {
      console.log('\t' + JSON.stringify(data, null, 4));
    }

    console.log('');
    console.log('');

    console.log(FgYellow + Bright + 'RESPONSE : ' + Reset);
    console.log(util.inspect(err.response.data, { depth: null, colors: true }));

    console.log('');
    console.log('');

  } else if (Object.keys(err).includes('errors')) {
    console.log(FgRed + Bright + 'Twitter error' + Reset);
    console.log('');
    err.errors.forEach(e => {
      const { title, type, detail, value } = e;
      console.log(`${FgYellow}${Bright}title:${Reset}\t${title}`);
      console.log(`${FgYellow}${Bright}type:${Reset}\t${type}`);
      console.log(`${FgYellow}${Bright}detail:${Reset}\t${detail}`);
      console.log('');
      console.log('');
    });
  } else {
    console.log('unknown error');
    console.log(err);
  }
  
}
