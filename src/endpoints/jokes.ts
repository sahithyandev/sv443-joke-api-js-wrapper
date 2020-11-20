// TK make this file easy-to-read and optimize it

import { Response } from "node-fetch"
import {
	Error,
	ResponseFormat,
	JokeType,
	IdRangeObject,
	Category,
	Flag,
	LanguageCode
} from "../types"

import { capitalize, arrayTesting } from "../_utils"
import { makeRequestToApi } from "./helper"
import { ErrorMessages, VALUES } from "./../values"

const isIdRange = (idRange: IdRangeObject | number): idRange is IdRangeObject => {
	return typeof idRange !== "number"
}

/**
 * Strict version of JokesRequestOptions
 * @private
 * @deprecated
 */
export type StrictJokesRequestOptions = {
	amount: number
	categories: Category[] | "Any"
	flags: Flag[]
	idRange?: IdRangeObject
	jokeType: "any" | JokeType
	language: LanguageCode
	responseFormat: ResponseFormat
	searchString: string
}

export type JokesRequestOptions = {
	/**
	 * @default 1
	 */
	amount?: number
	/**
	 * @default Any
	 */
	categories?: Category[] | "Any"
	/**
	 * @default []
	 */
	flags?: Flag[]
	idRange?: IdRangeObject | number
	/**
	 * @default any
	 */
	jokeType?: "any" | JokeType
	/**
	 * @default en
	 */
	language?: LanguageCode
	/**
	 * @default json
	 */
	responseFormat?: ResponseFormat
	searchString?: string
}

/**
 * Validate Request Options
 * and it will generate warnings too
 *
 * @todo Check these with fewer lines of code
 * @private
 */
function validateReqOptions(options: JokesRequestOptions): Error | null {
	// TK Test these rules

	if (options.amount) {
		if (options.amount > 10) {
			console.warn("Provided 'amount' value is higher than 10. JokeAPI's maximum 'amount' is 10.")
		}

		if (options.amount < 1) {
			return {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "`amount` can't be less than 1"
			}
		}
	}
	if (!Number.isSafeInteger(options.amount)) {
		return {
			code: ErrorMessages.INVALID_OPTION_VALUE,
			description: "`amount` must be an integer"
		}
	}

	// if all values inside options.flags is a valid flag, then throw error
	if (
		options.flags &&
		!arrayTesting(options.flags, (flag) => VALUES.AVAILABLE_FLAGS.includes(flag), "all")
	) {
		return {
			code: ErrorMessages.INVALID_OPTION_VALUE,
			description: "All values inside 'flags' array have to be a valid flag value."
		}
	}

	if (options.idRange && isIdRange(options.idRange)) {
		if (Math.min(options.idRange.from, options.idRange.to) < 0) {
			return {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "`idRange` values must be a non-negative number"
			}
		}
		if (options.idRange.from > options.idRange.to) {
			return {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "in `idRange`, `from` value must be smaller `to` value"
			}
		}
	}

	return null
}

type JokeAPIParams = {
	amount?: number
	lang?: string
	format?: ResponseFormat
	idRange?: string | number
	contains?: string
	type?: JokeType
	blackListFlags?: string
}

function getJokeApiParameters(options: JokesRequestOptions): JokeAPIParams {
	const params: JokeAPIParams = {
		amount: options.amount,
		lang: options.language,
		format: options.responseFormat,
		contains: options.searchString,
		type: options.jokeType !== "any" ? options.jokeType : undefined,
		blackListFlags: options.flags && options.flags.join(",")
	}
	if (options.idRange && isIdRange(options.idRange)) {
		params.idRange = `${options.idRange.from}-${options.idRange.to}`
	}

	return params
}

enum DEFAULT_OPTIONS {
	amount = 1,
	language = "en",
	responseFormat = "json",
	categories = "Any",
	jokeType = "any",
	searchString = ""
}

/**
 * Fetches jokes from the api
 */
export function getJokes(options: JokesRequestOptions = {}): Promise<Response> {
	// if idRange is defined as a number,
	// set it as from and to values on options
	if (typeof options.idRange === "number") {
		options.idRange = {
			from: options.idRange,
			to: options.idRange
		} as IdRangeObject
	}

	const validationError = validateReqOptions(options)
	if (validationError) throw validationError

	const mainRouteName =
		options.categories instanceof Array && options.categories.length !== 0
			? options.categories.map(capitalize).join(",")
			: "Any"

	return makeRequestToApi(`/joke/${mainRouteName}`, getJokeApiParameters(options))
}
