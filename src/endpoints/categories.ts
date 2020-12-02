import { Response } from "node-fetch"
import { BaseRequestOptions, makeRequestToApi } from "./helper"

// ust for better readability.
export interface CategoriesReqOptions extends BaseRequestOptions {}

/**
 * Fetches available categories on the api
 */
export function getCategories(options: CategoriesReqOptions): Promise<object | Response> {
	return makeRequestToApi("/categories", options)
}
