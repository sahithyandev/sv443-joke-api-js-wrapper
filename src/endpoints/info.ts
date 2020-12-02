import { Response } from "node-fetch"
import { BaseRequestOptions, makeRequestToApi } from "./helper"

export interface InfoReqOptions extends BaseRequestOptions {}

/**
 * Fetches the basic info of the api
 */
export function getInfo(options: InfoReqOptions): Promise<object | Response> {
	return makeRequestToApi("/info", options)
}
