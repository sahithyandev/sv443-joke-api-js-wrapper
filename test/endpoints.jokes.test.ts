import { validateReqOptions } from "../src/endpoints/jokes"
import { Error } from "../src/types"
import { ErrorMessages } from "../src/values"

describe("Testing validateReqOptions", () => {
	const testDataArray = [
		{ input: {}, output: null },
		{
			input: {
				amount: 0
			},
			output: {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "`amount` can't be less than 1"
			}
		},
		{
			input: {
				amount: 1.2
			},
			output: {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "'amount' must be an integer"
			}
		},
		{
			input: {
				flags: ""
			},
			output: {
				code: ErrorMessages.UNKNOWN_OPTION,
				description: "'flags' is not an available option"
			}
		},
		{
			input: {
				blacklistFlags: ["nnsfw"]
			},
			output: {
				code: ErrorMessages.INVALID_OPTION_VALUE,
				description: "All values inside 'flags' array have to be a valid flag value."
			}
		}
	]

	for (const testData of testDataArray) {
		test(`Testing ${testData.input}`, () => {
			// @ts-ignore
			expect(validateReqOptions(testData.input)).toEqual(testData.output)
		})
	}
})
