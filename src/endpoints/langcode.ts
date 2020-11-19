import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type LangCodeReqOptions = {
	/**
	 * Name of the language
	 */
	langaugeName: string
	format?: ResponseFormat
	lang?: LanguageCode
}

/**
 * Fetches language code of a language
 */
export function getLangCode(options: LangCodeReqOptions): Promise<Response> {
	return makeRequestToApi(`/langcode/${options.langaugeName}`, {
		...options,
		languageName: undefined
	})
}
