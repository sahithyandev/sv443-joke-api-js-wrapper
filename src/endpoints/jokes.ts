import { Response } from "node-fetch"
import {
	RequestOptions,
	StrictRequestOptions,
	Error,
	ErrorMessages,
	JokeAPIParams,
	StrObject
} from "../types"

import { DEFAULT_OPTIONS } from "../values"
import { capitalize } from "../utils"
import { makeRequestToApi } from "./helper"

function validateReqOptions(options: StrictRequestOptions): Error | null {
	const rules: StrObject<Error> = {
		"options.amount < 1": {
			message: ErrorMessages.INVALID_AMOUNT,
			description: "`amount` can't be less than 1"
		},
		"!Number.isSafeInteger(options.amount)": {
			message: ErrorMessages.INVALID_AMOUNT,
			description: "`amount` must be an integer"
		}
	}

	for (let rule of Object.keys(rules)) {
		if (eval(rule)) return rules[rule]
	}

	// TK Check these with fewer lines of code
	if (options.idRange?.from && options.idRange?.to) {
		if (Math.min(options.idRange.from, options.idRange.to) < 0) {
			return {
				message: ErrorMessages.INVALID_ID_RANGE,
				description: "`idRange` values must be a non-negative number"
			}
		}
		if (options.idRange.from > options.idRange.to) {
			return {
				message: ErrorMessages.INVALID_ID_RANGE,
				description: "in `idRange`, `from` value must be smaller `to` value"
			}
		}
	}

	return null
}

function getJokeApiParameters(options: StrictRequestOptions): JokeAPIParams {
	let idRange = undefined
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
		idRange: idRange,
		contains: options.searchString,
		type: options.jokeType !== "any" ? options.jokeType : undefined,
		blackListFlags: options.flags.join(",")
	}
}

export function getJokes(options: RequestOptions = {}): Promise<Response> {
	let _options: StrictRequestOptions = {
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
	if (options.idRange && typeof options.idRange === "number") {
		_options.idRange = {
			from: options.idRange,
			to: options.idRange
		}
	}

	if (_options.amount > 10) {
		console.warn("provided amount value is higher than 10. JokeAPI will only return 10 jokes")
	}

	let validationError = validateReqOptions(_options)
	if (validationError) throw validationError

	let mainRouteName =
		_options.categories !== "Any" ? _options.categories.map(capitalize).join(",") : "Any"

	return makeRequestToApi(`/joke/${mainRouteName}/`, getJokeApiParameters(_options))
}
