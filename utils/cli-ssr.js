const handleErr = require('./error-handling');

module.exports = async function(instance, args) {
  let value = args.filter(ar => ar.includes('value:'));
  let tag = args.filter(ar => ar.includes('tag:'));

  try {
    if (value.length === 0) throw "need command line argument : 'value:...'";
    if (tag.length === 0) throw "need command line argument : 'tag:...'";
  } catch (err) {
    console.log(err);
    throw '';         // throw this to return to index.js, prevent execution of block below
  }

  value = value[0].replace('value:', '');
  tag = tag[0].replace('tag:', '');

  try {
    const response = await instance.setStreamRules([
      { tag, value }
    ]);
    console.log(response.data);
  } catch (err) {
    handleErr(err);
  }

}