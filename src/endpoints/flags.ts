import { Response } from "node-fetch"
import { LanguageCode, ResponseFormat } from "./../types"
import { makeRequestToApi } from "./helper"

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
 */
export function getFlags(options: FlagsReqOptions = {}): Promise<Response> {
	return makeRequestToApi("/flags", options)
}
