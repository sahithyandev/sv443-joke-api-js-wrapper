// TK make this file easy-to-read and optimize it

import { Response } from "node-fetch"
import {
	Error,
	StrObject,
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
/**
 * Strict version of JokesRequestOptions
 * @private
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

function validateReqOptions(options: StrictJokesRequestOptions): Error | null {
	// TK Test these rules
	// if a rule have to use an imported value or function, then don't put that rule inside this object
	const rules: StrObject<Error> = {
		"options.amount < 1": {
			code: ErrorMessages.INVALID_OPTION_VALUE,
			description: "`amount` can't be less than 1"
		},
		"!Number.isSafeInteger(options.amount)": {
			code: ErrorMessages.INVALID_OPTION_VALUE,
			description: "`amount` must be an integer"
		}
	}

	for (const rule of Object.keys(rules)) {
		if (eval(rule)) return rules[rule]
	}

	// if all values inside options.flags is a valid flag, then throw error
	if (!arrayTesting(options.flags, (flag) => VALUES.AVAILABLE_FLAGS.includes(flag), "all")) {
		return {
			code: ErrorMessages.INVALID_OPTION_VALUE,
			description: "All values inside 'flags' array have to be a valid flag value."
		}
	}

	// TK Check these with fewer lines of code
	if (options.idRange?.from && options.idRange?.to) {
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
	amount: number
	lang: string
	format: ResponseFormat
	idRange?: string | number
	contains?: string
	type?: JokeType
	blackListFlags: string
}

function getJokeApiParameters(options: StrictJokesRequestOptions): JokeAPIParams {
	let idRange
	if (options.idRange) {
		if (typeof options.idRange === "number") {
			idRange = options.idRange
		} else {
			idRange = `${options.idRange.from}-${options.idRange.to}`
		}
	}

	return {
		amount: options.amount,
		lang: options.language,
		format: options.responseFormat,
		idRange,
		contains: options.searchString,
		type: options.jokeType !== "any" ? options.jokeType : undefined,
		blackListFlags: options.flags.join(",")
	}
}

export enum DEFAULT_OPTIONS {
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
	const _options: StrictJokesRequestOptions = {
		amount: options.amount || DEFAULT_OPTIONS.amount,
		language: options.language || DEFAULT_OPTIONS.language,
		responseFormat: options.responseFormat || DEFAULT_OPTIONS.responseFormat,
		flags: options.flags || [],
		categories: options.categories || DEFAULT_OPTIONS.categories,
		jokeType: options.jokeType || DEFAULT_OPTIONS.jokeType,
		searchString: options.searchString || ""
	}
	// if idRange is defined as a number,
	// set it as from and to values on _options
	if (typeof options.idRange === "number") {
		_options.idRange = {
			from: options.idRange,
			to: options.idRange
		}
	}

	if (_options.amount > 10) {
		console.warn("provided amount value is higher than 10. JokeAPI will only return 10 jokes.")
	}

	const validationError = validateReqOptions(_options)
	if (validationError) throw validationError

	const mainRouteName =
		_options.categories !== "Any" ? _options.categories.map(capitalize).join(",") : "Any"

	return makeRequestToApi(`/joke/${mainRouteName}`, getJokeApiParameters(_options))
}
