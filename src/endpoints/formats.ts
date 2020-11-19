import { Response } from "node-fetch"
import { ResponseFormat, LanguageCode } from "./../types"
import { makeRequestToApi } from "./helper"

export type FormatReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

export function getFormats(options: FormatReqOptions = {}): Promise<Response> {
	return makeRequestToApi("formats", options)
}
