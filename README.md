# Twittle

My personal implementation of Twitter's API through a CLI. Useful for getting some basic information from the comfort of your command line. Some of the things you can do with this module: 

* Search a specific Twitter user
* Get a Twitter user's basic information (username, number of followers, etc.)
* Get a live stream of Tweets that match certain search criteria
* Get a list of tweets from the user's timeline

Twittle because it is a Twitter Tool. Twi-Tool. Twittle. Lame, I know. I'm so sorry.

## Installation

This module is intended to be installed globally through the following: 

```
npm install -g twittle
```

In addition you will need to have an environmental variable `TWITTER_BEARER_TOKEN` defined in your machine's environment. This token can be retrieved by logging into your Twitter Developer account, entering your project dashboard, and then viewing the secret keys / credentials page. 



## Arguments

The following are a list of valid arguments: 

* `--guid [userid]` : 'get user by id', gets user data by username
* `--guna [username]` : 'get user by user name', gets user data either by username. 
* `--gsr`: 'get stream rules', retrieves the rules that are currently configured on your stream endpoin. Note that there can be multiple rules. See Twitter's Developer Documentation for rules syntax.
* `--dsr [ids]`: 'delete stream rules', accepts one or multiple ids.
* `--csr`: 'clear stream rules', running this command will delete all of the rules for your stream endpoint.
* `--ssr ['tag: ...' 'value: ...']`: 'set stream rules', takes two arguments, value and tag, and implements them as your stream rules by making a post request to the server. Note the colons. 
* `--stream ['followers:INT', 'following:INT']`: initiates a stream of tweets that is consistent with your stream rules criteria. Optional arguments for `followers:` and `following:` that filters the stream to output only and tweets whose author has X number of followers or X number accounts the author follows. *Please note that the filtering using these flags **does not** lower the volume of your queries, hence will not lower consumption of your developer quota. These filters are implemented in `./utils/Twitter.js` and only serve to hide undesired output.*
* `--tweets ['username:CHAR', 'userid:INT', 'pages:INT|all' 'file:CHAR']`: gets a list of the most recent tweets from the user's timeline. You must supply either a `username:` or `userid:` argument. By default the command will only return the most recent 100 tweets. To get more tweets, you can supply the optional `pages:` argument (tweets come in multiples/batches of 100). So, for instance, running `twittle --tweets username:TwitterDev pages:10` will get 100 of the latest tweets from the @TwitterDev account. To get as many tweets as possible, you can do `pages:all`. However, please note that the Twitter API only allows for retrieving up to approximately 30,000 tweets. Finally, if you do not supply a `file:` argument, the contents of the download will just print onto the screen; if you do supply a `file:` argument, the program will dump the data (in JSON format) into the file.


## Examples

The below example is an example of how to create a rule for your tweet streams. Note that it requires three parts: 

1) the `--ssr` flag
2) a `value:` argument (note the colon)
2) a `tag:` argument (note the colon)

```
twittle --ssr 
  'value:#congress bill' 
  'tag:search tweets w #congress and the word bill in tweet body'
```

Below is an example printing all the rules associated with your Twitter Developer account. Each individual rule has three lines (one for id, one for tag and another for value). For deleting rules, note the `id`: 

```
twittle --gsr
```

You can delete one or more stream rules like so (use `--gsr` to find your stream rules ids): 

```
twittle --dsr 000000 125930
```

here is an example using the --tweets flag. In this example, we will download as many tweets from @TwitterDev as the API allows, and then dump it into a file (can be in your current directory or a subdirectory, in this example, I will dump it into a file in a subdirectory)

```
twittle --tweets username:TwitterDev pages:all file:./logs/twitterdev.json
```



## Notes

Please note that this CLI will need read / write access to your system (see `--twitter` flag which may potentially dump data for your). 

If any errors should occur, I restructured the axios error so as to only show the basic request / response information (headers, body, etc.). When errors do occur, I recommend verifying first that the request header has the form : 

```
Authorization: Bearer [bearer key]
```

For trouble shooting your code, I recommend verifying the following: 

1) that you have a `TWITTER_BEARER_TOKEN` environmental variable defined in your environment.

2) that each request is using the correct bearer token. Outputted errors should clarify which, if any, token is being used.

