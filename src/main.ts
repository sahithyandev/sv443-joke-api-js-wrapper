import {
	requestOptions,
	strictRequestOptions,
	Error,
	ErrorMessages,
	JokeAPIParams,
	StrObject
} from "./types"

import { API_HOME, DEFAULT_OPTIONS } from "./values"
import { capitalize } from "./utils"
import fetch from "node-fetch"

function validateReqOptions(options: strictRequestOptions): Error | null {
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

function getJokeApiParameters(options: strictRequestOptions): JokeAPIParams {
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

export function getJokes(options: requestOptions = {}): Promise<Response> | null {
	let _options: strictRequestOptions = {
		amount: options.amount || DEFAULT_OPTIONS.amount,
		language: options.language || DEFAULT_OPTIONS.language,
		responseFormat: options.responseFormat || DEFAULT_OPTIONS.responseFormat,
		flags: options.flags || [],
		categories: options.categories || DEFAULT_OPTIONS.categories,
		jokeType: options.jokeType || DEFAULT_OPTIONS.jokeType,
		searchString: options.searchString || ""
	}
	if (_options.amount > 10) {
		console.warn("provided amount value is higher than 10. JokeAPI will only return 10 jokes")
	}
	// if idRange is defined as a number,
	// set it as from and to values on _options
	if (options.idRange && typeof options.idRange === "number") {
		_options.idRange = {
			from: options.idRange,
			to: options.idRange
		}
	}

	let apiReqUrl = API_HOME + "joke/"
	let mainRouteName =
		_options.categories !== "Any"
			? _options.categories.map((v) => capitalize(v as string)).join(",")
			: "Any"

	const params: JokeAPIParams = getJokeApiParameters(_options)

	apiReqUrl +=
		`${mainRouteName}?` +
		Object.entries(params)
			// @ts-ignore
			.filter(([_, v]) => ![undefined, ""].includes(v))
			.map(([key, v]) => `${key}=${v}`)
			.join("&")

	// do validation
	// TK why not validate the params instead of options?
	let validationError = validateReqOptions(_options)
	if (validationError) {
		throw validationError
	} else {
		// @ts-ignore
		return fetch(apiReqUrl)
	}
}
