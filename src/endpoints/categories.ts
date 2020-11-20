import { Response } from "node-fetch"
import { LanguageCode, ResponseFormat } from "./../types"
import { makeRequestToApi } from "./helper"

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
