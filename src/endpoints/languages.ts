import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type LanguagesReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

export function getLanguages(options: LanguagesReqOptions): Promise<Response> {
	return makeRequestToApi("/languages", options)
}
