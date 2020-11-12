const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        library: {
            name: 'JokeAPI',
            type: 'umd'
        },
        filename: 'index.js',
        path: path.join(__dirname, 'dist')
    }
}