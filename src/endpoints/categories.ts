import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type CategoriesReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

/**
 * Fetches available categories on the api
 */
export function getCategories(options: CategoriesReqOptions): Promise<Response> {
	return makeRequestToApi("/categories", options)
}
