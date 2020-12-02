// this file will be used by all endpoint files

import fetch, { Response } from "node-fetch"
import { cleanObject } from "../_utils"
import { log, SETTINGS, VALUES } from "./../values"

/**
 * Makes a request to the API
 *
 * @param {string} routeName Route of the request
 * @param {object} params Parameters to pass in the request
 */
export function makeRequestToApi(
	routeName: string,
	params: object = {}
): Promise<object | Response> {
	if (routeName.charAt(0) !== "/") routeName = "/" + routeName
	if (routeName.endsWith("/")) routeName = routeName.slice(0, -1)

	// remove undefined values
	const cleanedParams = cleanObject(params)

	let reqUrl = VALUES.API_BASE + routeName

	if (Object.keys(cleanedParams).length !== 0) {
		reqUrl +=
			"?" +
			Object.entries(cleanedParams)
				.map(([key, v]) => `${key}=${v}`)
				.join("&")
	}

	const request = fetch(reqUrl)
	log("Sending request", reqUrl)
	if (SETTINGS.handleResponsesInternally) {
		return handleResponseInternally(request)
	} else {
		return request
	}
}

export function handleResponseInternally(request: Promise<Response>): Promise<object> {
	return new Promise((resolve, reject) => {
		request
			.then((response) => response.json())
			.then((jsonData) => {
				const { error, ...data } = jsonData
				if (error) {
					log("Error occured: ", data)
					reject(data)
				}
				log("Got the data: ", data)
				resolve(data as object)
			})
			.catch((err) => {
				log("Error occured: ", err)
				reject(err)
			})
	})
}
