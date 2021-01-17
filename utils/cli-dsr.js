const handleErr = require('./error-handling');
const util = require('util');

module.exports = async function(instance, args) {
  // can receive multiple ids
  let ids = args.filter(ar => !ar.includes('--'));
  console.log('processing the following ids : ', ids)

  try {
    if (ids.length === 0) throw "need at least one rule id";
  } catch (err) {
    console.log(err);
    throw '';         // throw this to return to index.js, prevent execution of block below
  }

  try {
    const response = await instance.deleteStreamRules(ids);
    console.log(util.inspect(response, { depth: null, colors: true }));
  } catch (err) {
    handleErr(err);
  }

}