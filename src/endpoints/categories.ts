import { Response } from "node-fetch"
import { makeRequestToApi } from "./helper"
import { LanguageCode, ResponseFormat } from "./../types"

export type CategoriesReqOptions = {
	format?: ResponseFormat
	lang?: LanguageCode
}

export function getCategories(options: CategoriesReqOptions): Promise<Response> {
	return makeRequestToApi("/categories", options)
}
