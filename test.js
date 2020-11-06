const JokeAPI = require('./dist/index');

JokeAPI.getJokes({
    jokeType: {
        single: true
    },
    idRange: {
        from: 0,
        to: 291
    },
    amount: 1
}).then(res => console.log(res));