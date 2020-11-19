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

type TesterFunction = (item: string) => boolean

/**
 * @todo Find a better name for this function
 * @private
 */
export const arrayTesting = (
	arr: (string | number)[],
	tester: TesterFunction,
	condition: "all" | "some"
) => {
	if (arr.length === 0) return true
	if (!["all", "some"].includes(condition)) {
		throw new Error("Condition can be 'all' or 'some'")
	}
	const testerResultsArray = arr.map((v) => tester(v.toString()))
	if (condition === "all") {
		return !testerResultsArray.includes(false)
	} else {
		return testerResultsArray.includes(true)
	}
}
