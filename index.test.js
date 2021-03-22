const Twitter = require('./utils/Twitter');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

test('testing get user by username', () => {
  const twitter = new Twitter({ bearerToken: process.env.TWITTER_BEARER_TOKEN });
  twitter.queryByUserName('mattyglesias').then(res => {
    expect(Object.keys(res).includes('id'));
  }).catch(err => {
    expect(1 === 2);
    console.log('something went wrong with request');
  });
});