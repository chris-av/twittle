const handleErr = require('./error-handling');

module.exports = async function(instance, args) {
  let username = args.filter(ar => !ar.includes('--'));
  if (username.length > 1) throw 'only search one username at a time!'
  console.log('searching for twitter username : ', username);
  console.log('');
  console.log('');
  try {
    const response = await instance.queryByUserName(username);
    const keys = Object.keys(response);
    if (keys.includes('errors') || keys.includes('isAxiosError')) { throw response; }
    console.log(response);
  } catch (err) {
    handleErr(err);
  }
}
