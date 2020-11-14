export type Category = "Programming" | "Miscellaneous" | "Dark" | "Pun" | "Spooky" | "Christmas"

export type Flag = "nsfw" | "religious" | "political" | "racist" | "sexist"

export type ResponseFormat = "json" | "xml" | "yaml" | "plain"

export type JokeType = "single" | "twopart"

export type Error = {
	message: string
	description: string
}

export enum ErrorMessages {
	INVALID_AMOUNT = "`amount` value is invalid",
	INVALID_ID_RANGE = "`idRange` object is invalid"
}

// for validation
export type strictRequestOptions = {
	amount: number
	categories: Category[] | "Any"
	flags: Flag[]
	idRange?: {
		from?: number
		to?: number
	}
	jokeType: "any" | JokeType
	language: "cs" | "de" | "en" | "es"
	responseFormat: ResponseFormat
	searchString: string
}

// to get the input from the user
// all values are optional
// undefined values will be set to the default values
export type requestOptions = {
	amount?: number // default 1
	categories?: Category[] | "Any" // default 'Any'
	flags?: Flag[] // default []
	idRange?: {
		from?: number
		to?: number
	}
	jokeType?: "any" | JokeType // default 'any'
	language?: "cs" | "de" | "en" | "es" // default 'en'
	responseFormat?: ResponseFormat // default 'json'
	searchString?: string
}

export type JokeAPIParams = {
	amount: number
	lang: string
	format: ResponseFormat
	idRange?: string
	contains?: string
	type?: JokeType
	blackListFlags: string
}
