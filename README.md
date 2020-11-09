# Joke API - JavaScript wrapper

## Usage

```javascript
const JokeApi = require("joke-api");

JokeApi.getJokes({})
    .then((res) => res.json())
    .then((v) => console.log(v));
```
