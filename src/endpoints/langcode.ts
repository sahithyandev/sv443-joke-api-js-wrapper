import { Response } from "node-fetch"
import { Error, LanguageCode, ResponseFormat } from "./../types"
import { ErrorMessages } from "./../values"
import { makeRequestToApi } from "./helper"

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
	if (!options.langaugeName) {
		throw {
			code: ErrorMessages.UNDEFINED_REQUIRED_VALUE,
			description: "getLangCode: options.languageName can't be undefined"
		} as Error
	}

	return makeRequestToApi(`/langcode/${options.langaugeName}`, {
		...options,
		languageName: undefined
	})
}
