#!/usr/bin/env node

const fetch = require('node-fetch');

const commandName = process.argv[2]

function getInfo() {
	let info = {
		categories: [],
		flags: [],
		idRange: {},
		responseFormats: []
	}
	// TK move basic info about this wrapper into a common json file
	fetch("https://sv443.net/jokeapi/v2/info")
		.then(res => res.json())
		.then(data => {
			if (!data.error) {
				info.categories = data.jokes.categories
				info.flags = data.jokes.flags
				info.idRange = data.jokes.idRange
				info.responseFormats = data.formats
			} else {
				console.log(data);
			}
		}).then(_ => {
			// TK cache this data and use while development
			console.log(JSON.stringify(info, null, 4));
		})
}

const subCommands = [
	{
		commandName: 'info',
		action: getInfo
	}
]

let selectedCommand = subCommands.find((command) => commandName == command.commandName)
if (selectedCommand) {
	selectedCommand.action.call()
} else {
	throw `There are no commands named ${commandName}`
}