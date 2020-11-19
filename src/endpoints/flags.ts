import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type FlagsReqOptions = {
	/**
	 * Type of the response
	 */
	format?: ResponseFormat
	/**
	 * Language to use in the response
	 */
	lang?: LanguageCode
}

/**
 * Fetches available flags on the api
 *
 * @param {FlagsReqOptions} options Format options for the request
 */
export function getFlags(options: FlagsReqOptions = {}): Promise<Response> {
	return makeRequestToApi("/flags", options)
}
