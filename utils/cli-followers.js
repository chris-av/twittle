const util = require('util');
const delay = require('./delay');
const handleErr = require('./error-handling');
const checkFiletype = require('./check-filetype');
const writeFile = require('./write-file');

module.exports = async function(instance, args) {
  try {
    // one arg needs to indicate the user we are looking up
    const arg_username = args.filter(ar => ar.includes('username:'));
    const arg_userid = args.filter(ar => ar.includes('userid:'));
    const arg_filename = args.filter(ar => ar.includes('file:'));
    const arg_maxiter = args.filter(ar => ar.includes('pages:'));
    
    let filename;
    let userid;
    let maxiter = 1;

    if (arg_username.length === 0 && arg_userid.length === 0) throw 'user id or user name not supplied!';
    if (arg_username.length > 0 && arg_userid.length > 0) throw 'supply either username or user id, but not both!';
    if (arg_username.length > 1 || arg_userid.length > 1) throw 'only query one user at a time!';

    if (arg_filename.length > 0) filename = arg_filename[0].replace('file:', '');

    if (arg_maxiter.length > 0) {
      if (arg_maxiter[0].replace('pages:', '') === 'all') {
        maxiter = 1000000
      } else {
        maxiter = parseInt( arg_maxiter[0].replace('pages:', '') );
      }
    }

    let followers = [];
    let metas = [];
    let nextPageToken = ' ';
    let iter = 1;

    if (arg_username.length > 0) {
      const user_data = await instance.queryByUserName(arg_username[0].replace('username:', ''));
      userid = user_data.id
    } else {
      userid = userid[0].replace('userid:', '');
    }

    while (nextPageToken && (iter <= maxiter)) {
      if (iter % 5 === 0) { await delay(5); }
      const response = iter === 1 ? (
        await instance.getFollowers(userid)
      ) : (
        await instance.getFollowers(userid, nextPageToken)
      );
      console.log(Object.keys(response));
      response.data && response.data.forEach(follower => {
        followers.push( follower );
      });
      metas.push( response.meta );
      nextPageToken = response.meta.next_token;

      console.log('on page : ' + iter)
      console.log('cumulative followers length : ' + followers.length);
      if (nextPageToken) console.log('found next page token : ' + nextPageToken);
      console.log('');
      iter++;
      if (iter > maxiter) console.log('\nstopping here download here ... ');
    }


    if (filename) {

      writeFile({
        filename,
        filetype: checkFiletype(filename),
        data: { followers, metas },
      });

    } else {
      console.log(util.inspect({ followers, metas }, { depth: null, colors: true }));
    }


  } catch (err) {
    handleErr(err);
  }
}

