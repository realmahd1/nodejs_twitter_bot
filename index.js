const Twitter = require("twitter")
const dotenv = require("dotenv")
const axios = require('axios');
dotenv.config()

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

axios.get('https://type.fit/api/quotes').then((res) => {
  let englishQuotes = res.data;

  let randomNumber = Math.floor(Math.random() * englishQuotes?.length);
  function getCharacterLength(str) {
    return [...str].length;
  }
  // handle when quotes length is more than 280 character
  if (getCharacterLength(englishQuotes[randomNumber].text) < 280) {
    client.post("statuses/update", { status: `${englishQuotes[randomNumber].text}  \n\n ✍ ${englishQuotes[randomNumber].author}` }, function (error, tweet, response) {
      if (error) {
        console.log(error)
      } else {
        console.log(tweet)
      }
    })
  }
  else {
    const numberOfTweets = Math.ceil(getCharacterLength(englishQuotes[randomNumber].text) / 280);
    let firstTweetId;

    client.post("statuses/update", { status: `${englishQuotes[randomNumber].text.substring(0, 280)}` }, function (error, tweet, response) {
      if (error) {
        console.log(error)
      } else {
        firstTweetId = tweet.id_str;
        for (let i = 1; i < numberOfTweets; i++) {
          let start = 280 * i;
          client.post("statuses/update", { in_reply_to_status_id: firstTweetId, status: `${englishQuotes[randomNumber].text.substring(start, start + 280)} ${i === numberOfTweets - 1 ? `\n\n ✍ ${englishQuotes[randomNumber].author}` : ''}` }, function (error, tweet, response) {
            if (error) {
              console.log(error)
            } else {
              console.log(tweet)
            }
          })
        }
      }
    })
  }
})