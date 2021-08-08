const Twitter = require('twitter-v2');

class TwitterData {
  constructor(_bearerToken) {
    this.client = new Twitter({
      bearer_token: _bearerToken,
    });
  }

  // This method gets use basic twitter account information.
  // User Id, name, and username
  // User Id is useful to drill down deeper into a users twitter account
  getUserData = async (_username) => {
    const endpoint = 'users/by?usernames';
    const params = { usernames: _username };
    const user = await this.client.get(endpoint, params);
    return user;
  };

  // Given an id and a maximum number of results (n), this method
  // will return the account's n most recent tweets
  getUserTweets = async (_userId, _maxResults) => {
    const endpoint = `users/${_userId}/tweets`;
    const params = { max_results: _maxResults };
    const tweets = await this.client.get(endpoint, params);
    return tweets;
  };

  // Given an id and a maximum number of results (n), this method
  // will return the first n followers of the account
  getFollowers = async (_userId, _maxResults) => {
    const endpoint = `users/${_userId}/followers`;
    const params = { max_results: _maxResults };
    const followers = await this.client.get(endpoint, params);
    return followers;
  };

  // Given an id and a maximum number of results (n), this method
  // will return the first n accounts that the account is following
  getFollowing = async (_userId, _maxResults) => {
    const endpoint = `users/${_userId}/following`;
    const params = { max_results: _maxResults };
    const following = await this.client.get(endpoint, params);
    return following;
  };
}

module.exports = TwitterData;
