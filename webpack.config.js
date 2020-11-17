const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env) => {
	let target = env.TARGET
	let distDir = "dist"

	if (target === "node") distDir = "dist"
	if (target === "web") distDir = "web"

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
			path: path.join(__dirname, distDir)
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [{ from: "dist-types", to: `types` }]
			})
		]
	}
}
