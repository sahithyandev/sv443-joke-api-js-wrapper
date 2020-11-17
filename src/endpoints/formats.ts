import { Response } from "node-fetch"
import { ResponseFormat, LanguageCode } from "./../types"
import { makeRequestToApi } from "./helper"

type FormatReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

function getFormats(options: FormatReqOptions = {}): Promise<Response> {
	return makeRequestToApi("formats", options)
}

export { FormatReqOptions, getFormats }
