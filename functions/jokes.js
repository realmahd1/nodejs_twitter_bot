const axios = require('axios');
const { tweet } = require('./tweet');

module.exports.jokes = () => {

    axios.get('https://v2.jokeapi.dev/joke/Programming?type=single').then((res) => {
        let response = res.data;
        tweet(`${response.joke} \n\n #Programming_joke #programming #joke #bot`);
    }).catch((err) => {
        console.log(err);
    })
}