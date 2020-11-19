import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type LangCodeReqOptions = {
	langaugeName: string
	format?: ResponseFormat
	lang?: LanguageCode
}

export function getLangCode(options: LangCodeReqOptions): Promise<Response> {
	return makeRequestToApi(`/langcode/${options.langaugeName}`, {
		...options,
		languageName: undefined
	})
}
