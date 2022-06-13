const Twitter = require("twitter")
const dotenv = require("dotenv")

dotenv.config()

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

client.post("statuses/update", { status: "I tweeted from Node.js!" }, function(error, tweet, response) {
  if (error) {
    console.log(error)
  } else {
    console.log(tweet)
  }
})