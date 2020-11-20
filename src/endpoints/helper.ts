// this file will be used by all endpoint files

import fetch, { Response } from "node-fetch"
import { cleanObject } from "../_utils"
import { VALUES } from "./../values"

/**
 * Makes a request to the API
 *
 * @param {string} routeName Route of the request
 * @param {object} params Parameters to pass in the request
 */
export function makeRequestToApi(routeName: string, params: object = {}): Promise<Response> {
	if (routeName.charAt(0) !== "/") routeName = "/" + routeName
	if (routeName.endsWith("/")) routeName = routeName.slice(0, -1)

	// undefined values removed
	const cleanedParams = cleanObject(params)

	let reqUrl = VALUES.API_BASE + routeName

	if (Object.keys(cleanedParams).length !== 0) {
		reqUrl +=
			"?" +
			Object.entries(cleanObject(params))
				.map(([key, v]) => `${key}=${v}`)
				.join("&")
	}

	// TK make logging optional and provide a way to disable them
	console.log("Sending request", reqUrl)
	return fetch(reqUrl)
}
