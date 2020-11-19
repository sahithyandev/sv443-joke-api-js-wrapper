// Common functions used by this library
// All these functions defined here has to be `copy-paste`-able.
// They should be standalone functions

/**
 * Capitalizes a string's first letter and make other letters lowercased.
 * @private
 */
export const capitalize = (str: string): string => {
	if (["", null, undefined].includes(str)) return str
	return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

// TK find a better name for this function
/**
 * Removes null, undefined and "" from a object
 * @private
 */
export const cleanObject = (p: object): object => {
	const falseValues = [null, undefined, ""]
	const filteredItems = Object.entries(p).filter(([_, v]) => !falseValues.includes(v))

	const returnObj = {}
	for (const [key, v] of filteredItems) {
		// @ts-ignore
		returnObj[key] = v
	}
	return returnObj
}
