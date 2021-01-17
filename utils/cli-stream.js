const delay = require('./delay');
const handleErr = require('./error-handling');

module.exports = async function(instance, args) {
  try {
    const rules = await instance.getStreamRules();
    if (!Object.keys(rules).includes('data')) throw 'no rules found, use flag --ssr to create some rules'
    console.log('stream rules : ');
    rules.data.forEach(rule => {
      console.log(`(${rule.id}) ${rule.value} : ${rule.tag}`);
      console.log('\n');
    });

    let filters = { followers: 0, following: 0 };
    const args_followers = args.filter(ar => ar.includes('followers:'));
    const args_following = args.filter(ar => ar.includes('following:'));

    if (args_followers.length > 0) {
      filters.followers = parseInt(args_followers[0].replace('followers:', ''));
      if (!filters.followers) throw `could not parse ${args_followers[0].replace('followers:', '')}`;
    }
    
    if (args_following.length > 0) {
      filters.following = parseInt(args_following[0].replace('following:', ''));
      if (!filters.following) throw `could not parse ${args_following[0].replace('following:', '')}`;
    }

    if (filters.followers > 0 | filters.following > 0) {
      console.log(`filtering stream with at least ${filters.followers} followers ... `);
      console.log(`filtering stream with at least ${filters.following} following ... `);
      console.log('');
    }

    await delay(3);

    instance.stream(filters);
  } catch (err) {
    handleErr(err);
  }
}