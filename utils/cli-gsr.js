const handleErr = require('./error-handling');

module.exports = async function(instance) {
  try {
    const response = await instance.getStreamRules();
    if (response.data) {
      response.data.forEach(rule => {
        console.log(`rule id : ${rule.id}`);
        console.log(`rule tag : ${rule.tag}`);
        console.log(`rule value : ${rule.value}`);
        console.log('\n');
      });
    } else {
      console.log('no rules found ... ');
    }
  } catch (err) {
    handleErr(err);
  }
}