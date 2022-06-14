const client = require("./client")

module.exports.tweet = (text)=>{
    client.post("statuses/update", { status: text }, function (error, tweet, response) {
        if (error) {
            console.log(error)
        } else {
            console.log(tweet)
        }
    })
}