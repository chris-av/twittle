const https = require('https');
const axios = require('axios');

class Twitter {
  constructor(config) {
    this.api = axios.default.create({
      baseURL: 'https://api.twitter.com/2',
      headers: {
        Authorization: `Bearer ${config.bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
  }
  
  queryTweet(tweetId) {
    return new Promise((resolve, reject) => {
      this.api.get(`tweets/${tweetId}`, {
        params: { 'tweet.fields': 'public_metrics' }
      })
        .then(res => resolve(res.data.data))
        .catch(err => reject(err))
    });
  }
  
  queryUserById(userId) {
    return new Promise((resolve, reject) => {
      this.api.get(`users/${userId}`, {
        params: { 'user.fields': 'public_metrics' }
      })
        .then(res => {
          if (res.data.data) resolve(res.data.data);
          throw `could not find any data for user id : ${userId}`;
        })
        .catch(err => reject(err))
    });
  }
  queryByUserName(userName) {
    return new Promise((resolve, reject) => {
      this.api.get(`users/by/username/${userName}`, {
        params: { 'user.fields': 'public_metrics' }
      })
        .then(res => {
          if (res.data.data) resolve(res.data.data);
          throw `could not find any data for user name : ${userName}`;
        })
        .catch(err => reject(err))
    });
  }

  getTweets(id, pageToken = null) {
    return new Promise((resolve, reject) => {
      if (!id) reject('need to supply user id ... ')
      const params = { max_results: 100, 'tweet.fields': 'public_metrics,created_at' };
      if (pageToken) { params.pagination_token = pageToken };
      this.api.get(`users/${id}/tweets`, { params: params })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    });
  }
  
  getFollowers(userId) {
    return new Promise((resolve, reject) => {
      this.api.get(`users/${userId}/followers`)
        .then(res => resolve(res.data.data))
        .catch(err => reject(err))
    })
  }
  
  setStreamRules(rules) {
    // rules are in the form : [ { value: 'rule syntax', tag: 'rule description' }, ... ]
    return new Promise((resolve, reject) => {
      this.api.post('tweets/search/stream/rules', {
        add: rules
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    });
  }

  getStreamRules() {
    return new Promise((resolve, reject) => {
      this.api.get('tweets/search/stream/rules')
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    });
  }
  
  deleteStreamRules(rules) {
    // rules are in the form [ 0000, 0000, ... ]
    return new Promise((resolve, reject) => {
      this.api.post('tweets/search/stream/rules', {
        delete: { ids: rules }
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    });
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
          Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAACT2KwEAAAAAMQbgehZGgXV%2FTnjXf2MuqKrOvTs%3Da0Ed15ZWrOB1t6DO8Ql0kwrnYYYE5EghMZK24CC2adoxxulqwV'
        }
      };

      https.get(options, function(response) {
        let data = '';
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