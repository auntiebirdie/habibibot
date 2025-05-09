require('dotenv').config();

const Chance = require('chance').Chance();
const Cron = require('node-cron');

const {
  TwitterApi
} = require('twitter-api-v2');

Cron.schedule('0 * * * *', async () => {
  const twitterApi = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
  });

  const client = twitterApi.readWrite;

  delete require.cache[require.resolve('../data/responses.json')];

  const responses = require('../data/responses.json');

  await client.v2.tweet({
    text: Chance.pickone(responses)
  });
});
