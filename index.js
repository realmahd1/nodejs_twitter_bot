const Twitter = require("twitter")
const dotenv = require("dotenv")
const data = require("./data.json");

dotenv.config()

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

let randomNumber = Math.floor(Math.random() * data.length);
function getCharacterLength(str) {
  return [...str].length;
}

if (getCharacterLength(data[randomNumber].body) < 280) {
    client.post("statuses/update", { status: `${data[randomNumber].body}  \n\n ${data[randomNumber].author}` }, function (error, tweet, response) {
      if (error) {
        console.log(error)
      } else {
        console.log(tweet)
      }
    })
} else {
  const numberOfTwetts = Math.ceil(getCharacterLength(data[randomNumber].body) / 280);
  let firstTweetId;

  client.post("statuses/update", { status: `${data[randomNumber].body.substring(0, 280)}` }, function (error, tweet, response) {
    if (error) {
      console.log(error)
    } else {
      firstTweetId = tweet.id_str;
      for (let i = 1; i < numberOfTwetts; i++) {
        index = 280 * i;
        client.post("statuses/update", { in_reply_to_status_id: firstTweetId, status: `${data[randomNumber].body.substring(index, index + 280)} ${i === numberOfTwetts - 1 ? `\n\n ${data[randomNumber].author}` : ''}` }, function (error, tweet, response) {
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