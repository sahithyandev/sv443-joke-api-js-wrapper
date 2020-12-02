import { Response } from "node-fetch"
import { BaseRequestOptions, makeRequestToApi } from "./helper"

export interface FormatReqOptions extends BaseRequestOptions {}

/**
 * Fetches available response formats on the api
 */
export function getFormats(options: FormatReqOptions = {}): Promise<object | Response> {
	return makeRequestToApi("formats", options)
}
