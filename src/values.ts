// constant values
// needed by the library
// or outside the library

import { strictRequestOptions } from "./types";

export const API_HOME = "https://sv443.net/jokeapi/v2/";

// @important type of this variable is strictRequestOptions
// it is left out intentionally
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
];
export const AVAILABLE_FLAGS = [
	"nsfw",
	"religious",
	"political",
	"racist",
	"sexist"
];
