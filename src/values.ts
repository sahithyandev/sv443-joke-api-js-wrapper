export enum ErrorMessages {
	INVALID_OPTION_VALUE,
	UNDEFINED_REQUIRED_VALUE,
	UNKNOWN_OPTION
}

export const VALUES = {
	API_BASE: "https://jokeapi.dev/",
	AVAILABLE_FLAGS: ["nsfw", "religious", "political", "racist", "sexist"],
	AVAILABLE_CATEGORIES: ["Programming", "Miscellaneous", "Dark", "Pun", "Spooky", "Christmas"]
}

/**
 * Wrapper for console.log with optional logging
 * @private
 */
export const log = (...message: any[]): void => {
	if (SETTINGS.logging) {
		console.log(...message)
	}
}

interface SettingsType {
	/**
	 * To turn on "safe mode" on JokeAPI (introduced in v2.3.0)
	 * @default false
	 */
	safeMode: boolean
	/**
	 * If set true, the responses will be processed by the package itself.
	 * This means, every request to the API will return a new Promise, resolves to the actual data you requested, or an error.
	 * @default false
	 * @important Works with json data type only
	 */
	handleResponsesInternally: boolean
	/**
	 * Toggle logging.
	 * @default false
	 */
	logging: boolean
}

export const SETTINGS: SettingsType = {
	safeMode: false,
	handleResponsesInternally: false,
	logging: false
}
