#!/usr/bin/env node
const Twitter = require('./utils/Twitter');
require('dotenv').config({ path: __dirname + '/.env' });

const flags = require('./utils/flags');
const getUserId = require('./utils/cli-guid');
const getUsername = require('./utils/cli-guna');
const getStreamRules = require('./utils/cli-gsr');
const deleteStreamRules = require('./utils/cli-dsr');
const clearStreamRules = require('./utils/cli-csr');
const setStreamRules = require('./utils/cli-ssr');
const stream = require('./utils/cli-stream');
const getTweets = require('./utils/cli-tweets');
const help = require('./utils/cli-help');

const args = process.argv
  .filter(ar => ar !== process.execPath)
  .filter(ar => !ar.includes('/'))
  .filter(ar => !ar.includes('/index.js'))

async function main() {
  
  args.forEach(arg => {
    if (arg.includes('--guid')) { flags.guid = true; }
    if (arg.includes('--guna')) { flags.guna = true; }
    if (arg.includes('--gsr')) { flags.gsr = true; }
    if (arg.includes('--dsr')) { flags.dsr = true; }
    if (arg.includes('--csr')) { flags.csr = true; }
    if (arg.includes('--ssr')) { flags.ssr = true }
    if (arg.includes('--stream')) { flags.stream = true; };
    if (arg.includes('--tweets')) { flags.tweets = true; }
    if (arg.includes('--help')) { flags.help = true; }
  });

  let accum = 0;

  for (let i of Object.keys(flags)) {
    accum += flags[i];
  }

  try {
    
    if (!Object.keys(process.env).includes('TWITTER_BEARER_TOKEN')) throw 'need environmental variable $TWITTER_BEARER_TOKEN defined for this utility to work';
    if (accum > 1) throw 'cannot have more than one cli command, must use only one flag\n';
    
    const twitter = new Twitter({
      bearerToken: process.env.TWITTER_BEARER_TOKEN
    });

    if (flags.guid)  await getUserId(twitter, args);
    if (flags.guna) await getUsername(twitter, args);
    if (flags.gsr) await getStreamRules(twitter);
    if (flags.dsr) await deleteStreamRules(twitter, args);
    if (flags.csr) await clearStreamRules(twitter, args);
    if (flags.ssr) await setStreamRules(twitter, args);
    if (flags.stream) await stream(twitter, args);
    if (flags.tweets) await getTweets(twitter, args);
    if (flags.help) help();

  } catch (err) {
    console.log(err);
  }
  
}

main();