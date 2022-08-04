'use strict';
const { json } = require('body-parser');
const fetch =  require('cross-fetch');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports.twitBot = async () => {
  try {
    const res = await fetch('https://geek-jokes.sameerkumar.website/api?format=json');

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const jsonjoke = await res.json();
    const joke = JSON.stringify(jsonjoke.joke);
    console.log(joke)
      try{
        const twit = await client.post('statuses/update', {status: joke});
        if (twit.status >= 400){
          throw new Error('Bad response from server')
        }
        console.log(twit)
      }catch(err){
        console.log(err);
      }
    }catch (err) {
    console.error(err);
  }
  
  
};
