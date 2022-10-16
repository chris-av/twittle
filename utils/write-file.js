const fs = require('fs');


module.exports = function(config) {

  const { filename, filetype, data } = config;

  if (!filename) throw new Error('need to provide filename!');
  if (!filetype) throw new Error('could not detect filetype ... ');
  if (!data) throw new Error('do not have data to write ... ');

  let operation = '';
  if (Object.keys(data).includes('tweets')) operation = 'tweets';
  if (Object.keys(data).includes('followers')) operation = 'followers';

  if (filetype === 'TEXT') {

    let text = [];

    if (operation === 'tweets') {
      data.tweets.forEach(row => {
        text.push(`# times retweeted: ${row.public_metrics.retweet_count}, ${new Date(row.created_at).toLocaleString()}\n${row.text}`);
      });
    }

    if (operation === 'followers') {
      data.followers.forEach(row => {
        text.push(`${row.username} (${new Date(row.created_at).toLocaleString()} : ${row.description})`);
      });
    }

    text = text.join('\n\n');
    fs.writeFileSync(filename, text, { encoding: 'utf8' });

  }

  if (filetype === 'JSON') {
    fs.writeFileSync(filename, JSON.stringify(data, null, 4));
  }

  if (filetype === 'CSV') {

    let text = [];

    data[operation].forEach(row => {
      const rowJoined = Object.keys(row).map(key => row[key]).join(',');
      text.push( rowJoined );
    });

    text = text.join('\n');
    fs.writeFileSync(filename, text, { encoding: 'utf8' });

  }

  return;

}
