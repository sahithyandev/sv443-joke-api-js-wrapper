# JokeAPI - JavaScript wrapper

JavaScript wrapper for the [JokeAPI](https://sv443.net/jokeapi/v2/).

**Note** It's still under development. So I don't recommend to use this wrapper in a _serious_ projects.

If you really want to use this library in your project. Go ahead and use it. But there may be some bugs and **there are no documentation available at the moment**.

## Usage

1. Install using `yarn` or `npm`.

```bash
npm install --save sv443-joke-api
# OR
yarn add sv443-joke-api
```

2. Use it.

```typescript
const JokeApi = require("joke-api");

// This snippet shows the available values of those functions
// If not defined, will be set to the default alue
// if default is not shown below, it will be left out while making a request
JokeApi.getJokes({
    categories?: Category[] | "Any"; // default 'Any'
    responseFormat?: "json" | "xml" | "yaml" | "txt"; // default 'json'
    jokeType?: "single" | "twopart" | "any"; // default 'any'
    searchString?: string;
    language?: "cs" | "de" | "en" | "es"; // default 'en'
    flags?: "" | Flag[]; // default ''
    idRange?: {
        from?: number;
        to?: number;
    };
    amount?: number; // default 1
}).then((res) => res.json())
    .then((v) => console.log(v));
```

## Development

This project needs so much improvements. So don't mind to change the anything.

1. [Click here](https://github.com/sahithyandev/sv433-joke-api-js-wrapper/fork) to fork this repository.
2. Clone it to your machine.
3. Run `npm install` in the folder.
4. Make the changes you want.  
   Currently there are no tests defined, to test your code. I hope they will be added in future. Until then, you have to be careful. You have to test it manually.
5. Push your changes to the repo under your account.
6. Pull a request.

I recommend using **Visual Studio Code** with **ESLint** extension as the development environment.

## Contributing

Pull requests are always welcome.  
Be friendly.  
And when making a pull request, make sure you didn't break anything.
