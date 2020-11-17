export type Category = "Programming" | "Miscellaneous" | "Dark" | "Pun" | "Spooky" | "Christmas"

export type Flag = "nsfw" | "religious" | "political" | "racist" | "sexist"

export type ResponseFormat = "json" | "xml" | "yaml" | "plain"
export type LanguageCode = "cs" | "de" | "en" | "es"
export type JokeType = "single" | "twopart"

export interface IdRangeObject {
	from: number
	to: number
}

export type Error = {
	message: string
	description: string
}

export enum ErrorMessages {
	INVALID_AMOUNT = "`amount` value is invalid",
	INVALID_ID_RANGE = "`idRange` object is invalid",
	INVALID_OPTIONS = "options object is invalid"
}

// for validation
export type StrictRequestOptions = {
	amount: number
	categories: Category[] | "Any"
	flags: Flag[]
	idRange?: IdRangeObject
	jokeType: "any" | JokeType
	language: LanguageCode
	responseFormat: ResponseFormat
	searchString: string
}

// to get the input from the user
// all values are optional
// undefined values will be set to the default values
export type RequestOptions = {
	amount?: number // default 1
	categories?: Category[] | "Any" // default 'Any'
	flags?: Flag[] // default []
	idRange?: IdRangeObject | number
	jokeType?: "any" | JokeType // default 'any'
	language?: LanguageCode // default 'en'
	responseFormat?: ResponseFormat // default 'json'
	searchString?: string
}

export type JokeAPIParams = {
	amount: number
	lang: string
	format: ResponseFormat
	idRange?: string | number
	contains?: string
	type?: JokeType
	blackListFlags: string
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
