import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type FlagsReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

export function getFlags(options: FlagsReqOptions): Promise<Response> {
	return makeRequestToApi("/flags", options)
}
