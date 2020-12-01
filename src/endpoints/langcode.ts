import { Response } from "node-fetch"
import { Error, LanguageCode, ResponseFormat } from "./../types"
import { ErrorMessages } from "./../values"
import { makeRequestToApi } from "./helper"

export type LangCodeReqOptions = {
	/**
	 * Name of the language
	 */
	languageName: string
	format?: ResponseFormat
	lang?: LanguageCode
}

/**
 * Fetches language code of a language
 */
export function getLangCode(options: LangCodeReqOptions): Promise<object | Response> {
	if (options === undefined || options.languageName === undefined) {
		throw {
			code: ErrorMessages.UNDEFINED_REQUIRED_VALUE,
			description: "getLangCode: options.languageName can't be undefined"
		} as Error
	}

	return makeRequestToApi(`/langcode/${options.languageName}`, {
		...options,
		languageName: undefined
	})
}
