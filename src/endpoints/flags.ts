import { Response } from "node-fetch"
import { BaseRequestOptions, makeRequestToApi } from "./helper"

export interface FlagsReqOptions extends BaseRequestOptions {}

/**
 * Fetches available flags on the api
 */
export function getFlags(options: FlagsReqOptions = {}): Promise<object | Response> {
	return makeRequestToApi("/flags", options)
}
