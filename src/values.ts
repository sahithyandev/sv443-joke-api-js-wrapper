// constant values
// needed by this package
// or the users of this package

export const API_HOME = "https://sv443.net/jokeapi/v2/"

export enum DEFAULT_OPTIONS {
	amount = 1,
	language = "en",
	responseFormat = "json",
	categories = "Any",
	jokeType = "any",
	searchString = ""
}

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
