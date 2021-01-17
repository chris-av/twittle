const handleErr = require('./error-handling');

module.exports = async function(instance) {
  try {
    console.log('clearing stream rules ... ');
    const rules = await instance.getStreamRules();
    if (!Object.keys(rules).includes('data')) throw 'no rules found! already cleared'

    let ids = [];

    rules.data.forEach(rule => {
      console.log(`found rule (${rule.id}) ${rule.value} : ${rule.tag}`);
      ids.push(rule.id);
    });
    console.log('');

    const response = await instance.deleteStreamRules(ids);
    console.log(util.inspect(response, { depth: null, colors: true }));
  } catch (err) {
    handleErr(err);
  }
}