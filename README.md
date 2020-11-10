# JokeAPI - JavaScript wrapper

JavaScript wrapper for the [JokeAPI](https://sv443.net/jokeapi/v2/).

**Note** It's still under development. So don't use this wrapper in _serious_ projects.

## Usage

1. Install using `yarn` or `npm`.

```bash
npm install --save sv443-joke-api
# OR
yarn add sv443-joke-api
```

2. Use it.

```javascript
const JokeApi = require("joke-api");

JokeApi.getJokes({})
    .then((res) => res.json())
    .then((v) => console.log(v));
```

## Development

This project needs so much improvements. So don't mind to change the file structure or anything else.

1. [Click here](https://github.com/sahithyandev/sv433-joke-api-js-wrapper/fork) to fork this repo.
2. Clone it to your machine.
3. Run `npm install` in the folder.
4. Make the changes.
   Currently there are no tests defined, to test your code. I hope they will be added in future. Until then, you have to be careful.
5. Push your changes to the repo under your account.
6. Pull a request.

I recommend using **Visual Studio Code** with **ESLint** extension as the development environment.

## Contributing

Pull requests are always welcome.
Be friendly.
But make sure you didn't break anything.
