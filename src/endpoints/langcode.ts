import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat, Error } from "./../types"
import { ErrorMessages } from "./../values"

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
