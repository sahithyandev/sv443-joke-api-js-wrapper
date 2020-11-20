// TK make this file easy-to-read and optimize it

import { Response } from "node-fetch"
import {
	Category,
	Error,
	Flag,
	IdRangeObject,
	JokeType,
	LanguageCode,
	ResponseFormat
} from "../types"

import { arrayTesting, capitalize } from "../_utils"
import { ErrorMessages, VALUES } from "./../values"
import { makeRequestToApi } from "./helper"

const isIdRange = (idRange: IdRangeObject | number): idRange is IdRangeObject => {
	return typeof idRange !== "number"
}

/**
 * Strict version of JokesRequestOptions
 * @private
 * @deprecated
 */
// @ts-ignore
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
	blacklistFlags?: Flag[]
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
 * @private
 * @todo Check these with fewer lines of code
 */
export function validateReqOptions(options: JokesRequestOptions): Error | null {
	const AVAILABLE_OPTIONS = [
		"amount",
		"categories",
		"blacklistFlags",
		"idRange",
		"jokeType",
		"language",
		"responseFormat",
		"searchString"
	]

	for (const optionName of Object.keys(options)) {
		if (!AVAILABLE_OPTIONS.includes(optionName)) {
			return {
				code: ErrorMessages.UNKNOWN_OPTION,
				description: `'${optionName}' is not an available option`
			}
		}
	}

	if (options.amount !== undefined) {
		if (options.amount > 10) {
			console.warn("Provided 'amount' value is higher than 10. JokeAPI's maximum 'amount' is 10.")
		}

		if (options.amount < 1) {
			return {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "`amount` can't be less than 1"
			}
		}
		if (!Number.isSafeInteger(options.amount)) {
			return {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "'amount' must be an integer"
			}
		}
	}

	if (
		options.blacklistFlags &&
		!arrayTesting(options.blacklistFlags, (flag) => VALUES.AVAILABLE_FLAGS.includes(flag), "all")
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
		blackListFlags: options.blacklistFlags && options.blacklistFlags.join(",")
	}
	if (options.idRange && isIdRange(options.idRange)) {
		params.idRange = `${options.idRange.from}-${options.idRange.to}`
	}

	return params
}
// @ts-ignore
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
