import { Response } from "node-fetch"
import { Error } from "./../types"
import { ErrorMessages } from "./../values"
import { BaseRequestOptions, makeRequestToApi } from "./helper"

export interface LangCodeReqOptions extends BaseRequestOptions {
	/**
	 * Name of the language
	 */
	languageName: string
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
