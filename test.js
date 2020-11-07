const JokeApi = require('./lib');

JokeApi.getJokes({
}).then(res => res.json()).then(v => console.log(v));