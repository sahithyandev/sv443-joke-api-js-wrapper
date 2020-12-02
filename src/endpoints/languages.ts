import { Response } from "node-fetch"
import { BaseRequestOptions, makeRequestToApi } from "./helper"

export interface LanguagesReqOptions extends BaseRequestOptions {}

export function getLanguages(options: LanguagesReqOptions): Promise<object | Response> {
	return makeRequestToApi("/languages", options)
}
