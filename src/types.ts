export type Category =
	| "Programming"
	| "Misc"
	| "Dark"
	| "Pun"
	| "Spooky"
	| "Christmas"
	// aliases
	| "Miscellaneous"
	| "Coding"
	| "Development"
	| "Halloween"
export type Flag = "nsfw" | "religious" | "political" | "racist" | "sexist" | "explicit"
export type ResponseFormat = "json" | "xml" | "yaml" | "plain"
export type LanguageCode = "cs" | "de" | "en" | "es"
export type JokeType = "single" | "twopart"
export type IdRangeObject = {
	from: number
	to: number
}

/**
 * Type of Error object
 */
export type Error = {
	/** Error code */
	code: any
	/** Description of the error */
	description: string
}

/**
 * A wrapper for "Object with string keys" type
 */
export type StrObject<ValueType> = {
	[key: string]: ValueType
}

/**
 * A wrapper for "Object with number keys" type
 */
export type NumberObject<ValueType> = {
	[key: number]: ValueType
}
