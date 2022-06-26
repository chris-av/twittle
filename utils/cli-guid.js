const handleErr = require('./error-handling');

module.exports = async function(instance, args) {
  let id = args.filter(ar => !ar.includes('--'));
  if (id.length > 1) throw 'only search one id at a time!'
  console.log('searching for twitter id : ', id);
  console.log('');
  console.log('');
  try {
    const response = await instance.queryUserById(id);
    const keys = Object.keys(response);
    if (keys.includes('errors') || keys.includes('isAxiosError')) { throw response; }
    console.log(response);
  } catch (err) {
    handleErr(err);
  }
}
