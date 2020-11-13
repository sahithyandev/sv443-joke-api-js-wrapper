const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                use: 'babel-loader'
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