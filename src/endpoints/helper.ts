// this file will be used by all endpoint files

import fetch, { Response } from "node-fetch"
import { SETTINGS } from "./../values"
import { cleanObject } from "./../utils"

export function makeRequestToApi(routeName: string, params: Object = {}): Promise<Response> {
	// TK make it simple with RegExp find and replace
	if (routeName.charAt(0) !== "/") routeName = "/" + routeName
	if (routeName.charAt(routeName.length - 1) !== "/") routeName = routeName + "/"

	let reqUrl =
		SETTINGS.API_BASE +
		routeName +
		Object.entries(cleanObject(params))
			.map(([key, v]) => `${key}=${v}`)
			.join("&")

	console.log("Requesting", reqUrl)
	return fetch(reqUrl)
}
