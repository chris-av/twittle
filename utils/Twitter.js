const https = require('https');
const axios = require('axios').default;

class Twitter {
  constructor(config) {
    this.api = axios.create({
      baseURL: 'https://api.twitter.com/2',
      headers: {
        Authorization: `Bearer ${config.bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async queryTweet(tweetId) {
    try {
      const res = await this.api.get(`tweets/${tweetId}`, {
        params: { 'tweet.fields': 'public_metrics' }
      });
      if (res.data.errors) { throw res.data; }
      const data = res.data.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async queryUserById(userId) {
    try {
      const res = await this.api.get(`users/${userId}`, {
        params: { 'user.fields': 'public_metrics' }
      });
      if (res.data.errors) { throw res.data; }
      const data = res.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async queryByUserName(userName) {
    try {
      const res = await this.api.get(`users/by/username/${userName}`, {
        params: { 'user.fields': 'public_metrics' }
      });
      if (res.data.errors) { throw res.data; }
      const data = res.data.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async getTweets(userId, pageToken = null) {
    try {
      if (!userId) throw new Error('need to supply user id');
      const params = { max_results: 100, 'tweet.fields': 'public_metrics,created_at' };
      if (pageToken) { params.pagination_token = pageToken; }
      const res = await this.api.get(`users/${userId}/tweets`, { params: params });
      if (res.data.errors) { throw res.data; }
      const data = res.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async getFollowers(userId) {
    try {
      const res = await this.api.get(`users/${userId}/followers`);
      if (res.data.errors) { throw res.data; }
      const data = res.data.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async setStreamRules(rules) {
    // rules are in the form : [ { value: 'rule syntax', tag: 'rule description' }, ... ]
    try {
      const res = await this.api.post(`tweets/search/stream/rules`, {
        add: rules
      });
      if (res.data.errors) { throw res.data; }
      const data = res;
      return data;
    } catch (err) {
      return err;
    }
  }

  async getStreamRules() {
    try {
      const res = await this.api.get(`tweets/search/stream/rules`);
      if (res.data.errors) { throw res.data; }
      const data = res.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async deleteStreamRules(rules) {
    // rules are in the form [ 0000, 0000, ... ]
    try {
      const res = await this.api.post(`tweets/search/stream/rules`, {
        delete: { ids: rules }
      });
      if (res.data.errors) { throw res.data; }
      const data = res.data;
      return data;
    } catch (err) {
      return err;
    }
  }

  async stream(filters) {
    try {
      const params = [
        'tweet.fields=created_at,text,public_metrics',
        'expansions=author_id',
        'user.fields=public_metrics'
      ].join('&');

      const options = {
        host: 'api.twitter.com',
        path: params.length > 1 ? '/2/tweets/search/stream?' + params : '/2/tweets/search/stream',
        headers: {
          Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
        }
      };

      https.get(options, function(response) {
        response.on('data', function(chunk) {
          try {
            const data = JSON.parse(chunk);
            // console.log(util.inspect(data, { depth: null, colors: true }));

            if (
              data.includes.users[0].public_metrics.followers_count > filters.followers &
              data.includes.users[0].public_metrics.following_count > filters.following
            ) {

              data.includes.users.forEach(usr => {
                console.log(`id : ${usr.id}`);
                console.log(`name : ${usr.name}`);
                console.log(`username : ${usr.username}`);
                console.log(`followers : ${usr.public_metrics.followers_count}`);
                console.log(`following : ${usr.public_metrics.following_count}`);
              })
              console.log(`date : ${data.data.created_at}`);
              console.log('text : ' + data.data.text);
              console.log('\n');

            }

          } catch (err) {
            console.log(chunk.toString());
          }
        });
        response.on('error', function(err) { throw err; });
        response.on('end', function() { console.log('stream has ended'); });
      }).on('error', function(err) {
        throw err;
      })
    } catch (err) {
      throw err;
    }
  }

}

module.exports = Twitter;
