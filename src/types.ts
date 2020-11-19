export type Category = "Programming" | "Miscellaneous" | "Dark" | "Pun" | "Spooky" | "Christmas"
export type Flag = "nsfw" | "religious" | "political" | "racist" | "sexist"
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
	/** Error message */
	message: string
	/** Description of the error */
	description: string
}

export enum ErrorMessages {
	INVALID_AMOUNT = "`amount` value is invalid",
	INVALID_ID_RANGE = "`idRange` object is invalid",
	INVALID_OPTIONS = "options object is invalid"
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
