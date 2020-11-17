// this file will be used by all endpoint files

import fetch, { Response } from "node-fetch"
import { SETTINGS } from "./../values"
import { cleanObject } from "./../utils"

export function makeRequestToApi(routeName: string, params: Object = {}): Promise<Response> {
	if (routeName.charAt(0) !== "/") routeName = "/" + routeName

	let reqUrl =
		SETTINGS.API_BASE +
		routeName +
		"?" +
		Object.entries(cleanObject(params))
			.map(([key, v]) => `${key}=${v}`)
			.join("&")

	console.log("Sending request", reqUrl)
	return fetch(reqUrl)
}
