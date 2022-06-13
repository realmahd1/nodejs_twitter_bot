const Twitter = require("twitter")
const dotenv = require("dotenv")
const axios = require('axios');
dotenv.config()

module.exports.jokes = () => {

    const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    })
    axios.get('https://v2.jokeapi.dev/joke/Programming?type=single').then((res) => {
        let response = res.data;

        client.post("statuses/update", { status: `${response.joke} \n\n #Programming_joke #programming #joke #bot` }, function (error, tweet, response) {
            if (error) {
                console.log(error)
            } else {
                console.log(tweet)
            }
        })

    }).catch((err) => {
        console.log(err);
    })
}