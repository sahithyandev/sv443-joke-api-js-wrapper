import { Response } from "node-fetch"
import { LanguageCode, ResponseFormat } from "./../types"
import { makeRequestToApi } from "./helper"

export type LanguagesReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

export function getLanguages(options: LanguagesReqOptions): Promise<object | Response> {
	return makeRequestToApi("/languages", options)
}
