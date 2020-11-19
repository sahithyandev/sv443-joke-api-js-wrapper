// constant values
// needed by this package
// or the users of this package

// TK make them dynamic
export const AVAILABLE_CATEGORIES = [
	"Programming",
	"Miscellaneous",
	"Dark",
	"Pun",
	"Spooky",
	"Christmas"
]

export const AVAILABLE_FLAGS = ["nsfw", "religious", "political", "racist", "sexist"]

export enum ErrorMessages {
	INVALID_OPTION_VALUE,
	UNDEFINED_REQUIRED_VALUE
}

export const SETTINGS = {
	API_BASE: "https://sv443.net/jokeapi/v2"
}
