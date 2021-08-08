require('dotenv').config();
const TwitterData = require('./twitter');

const twitterData = new TwitterData(process.env.TWITTER_BEARER_TOKEN);

let userId = '';
let name = '';
let username = 'rleshner';

const getUserDataAndTweets = async (_username) => {
  const userData = await twitterData.getUserData(_username);
  userId = userData.data[0].id;
  name = userData.data[0].name;
  const tweets = await twitterData.getUserTweets(userId, 100);
  const followers = await twitterData.getFollowers(userId, 200);
  const following = await twitterData.getFollowing(userId, 200);
  displayUserInfo(userId, name, username);
  console.log('*************** Following ***************');
  console.log(following);
  console.log('*************** Followers ***************');
  console.log(followers);
  console.log('*************** Hashtags ***************');
  const hashtagFreq = getHashtagFrequencies(tweets);
  console.log(hashtagFreq);
};

const displayUserInfo = (_id, _name, _username, _tweets) => {
  console.log(`User Id: ${_id}`);
  console.log(`Name: ${_name}`);
  console.log(`Username: ${_username}\n`);
};

const getHashtagFrequencies = (_tweets) => {
  // Regex pattern for a hashtag within tweet text
  const pattern = /#\w+/g;

  // Array to store our tags when found
  const tags = [];

  // Hashtag frequency mapping
  const tagFrequencies = {};

  // First lets find all the hashtags and squirrel them away in our tags array
  for (tweet of _tweets.data) {
    const matches = tweet.text.match(pattern);
    if (matches !== null) {
      tags.push(...matches);
    }
  }

  // Next build and return a frequency map of our hashtags
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    tagFrequencies[tag]
      ? (tagFrequencies[tag] += 1)
      : (tagFrequencies[tag] = 1);
  }
  return tagFrequencies;
};

getUserDataAndTweets(username);
