import { Response } from "node-fetch"
import { LanguageCode, ResponseFormat } from "./../types"
import { makeRequestToApi } from "./helper"

export type InfoReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

/**
 * Fetches the basic info of the api
 */
export function getInfo(options: InfoReqOptions): Promise<Response> {
	return makeRequestToApi("/info", options)
}
