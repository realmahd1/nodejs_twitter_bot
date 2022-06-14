const axios = require('axios');
const client  = require('./client');
const { tweet } = require("./tweet");

module.exports.quotes = () => {

    axios.get('https://type.fit/api/quotes').then((res) => {
        let englishQuotes = res.data;

        let randomNumber = Math.floor(Math.random() * englishQuotes?.length);
        function getCharacterLength(str) {
            return [...str].length;
        }
        // handle when quotes length is more than 280 character
        if (getCharacterLength(englishQuotes[randomNumber].text) < 280) {
            tweet(`${englishQuotes[randomNumber].text}  \n\n ✍ ${englishQuotes[randomNumber].author} \n\n #quotes #bot`);
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
                        client.post("statuses/update", { in_reply_to_status_id: firstTweetId, status: `${englishQuotes[randomNumber].text.substring(start, start + 280)} ${i === numberOfTweets - 1 ? `\n\n ✍ ${englishQuotes[randomNumber].author} \n\n #quotes #bot` : ''}` }, function (error, tweet, response) {
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
    }).catch((err) => {
        console.log(err);
    })
}