// this file will be used by all endpoint files

import fetch, { Response } from "node-fetch"
import { SETTINGS } from "./../values"
import { cleanObject } from "../_utils"

/**
 * Makes a request to the API
 *
 * @param {string} routeName Route of the request
 * @param {object} params Parameters to pass in the request
 *
 * @returns {Promise<Response>} A Promise which resolves to a response
 */
export function makeRequestToApi(routeName: string, params: object = {}): Promise<Response> {
	if (routeName.charAt(0) !== "/") routeName = "/" + routeName
	if (routeName.endsWith("/")) routeName = routeName.slice(0, -1)

	const reqUrl =
		SETTINGS.API_BASE +
		routeName +
		"?" +
		Object.entries(cleanObject(params))
			.map(([key, v]) => `${key}=${v}`)
			.join("&")

	console.log("Sending request", reqUrl)
	return fetch(reqUrl)
}
