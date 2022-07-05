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



## Help

see the `help.txt` file for in depth explanations. Running `twittle --help` will simply cat the file to your stdout. Make sure to run `twittle --help | less` for easy navigation (on *nix based systems)!



## Notes

Please note that this CLI will need read / write access to your system (see `--twitter` flag which may potentially dump data for your). 

If any errors should occur, I restructured the axios error so as to only show the basic request / response information (headers, body, etc.). When errors do occur, I recommend verifying first that the request header has the form : 

```
Authorization: Bearer [bearer key]
```

For trouble shooting your code, I recommend verifying the following: 

1) that you have a `TWITTER_BEARER_TOKEN` environmental variable defined in your environment.

2) that each request is using the correct bearer token. Outputted errors should clarify which, if any, token is being used.

