const path = require("path")

module.exports = (env) => {
	let target = env.TARGET

	return {
		entry: "./src/index.ts",
		module: {
			rules: [
				{
					test: /\.ts/,
					exclude: /node_modules/,
					use: "babel-loader"
				}
			]
		},
		target,
		resolve: {
			extensions: [".ts"]
		},
		output: {
			library: {
				name: "JokeAPI",
				type: "umd"
			},
			filename: "index.js",
			path: path.join(__dirname, "dist-" + target)
		}
	}
}
