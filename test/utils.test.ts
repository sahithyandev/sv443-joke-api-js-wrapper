import * as utilFunctions from "./../src/_utils"
import { StrObject } from "../src/types"

export type FunctionTestData = {
	input: any
	output: any
}

const FUNCTIONS: StrObject<FunctionTestData[]> = {
	capitalize: [
		{ input: [""], output: "" },
		{ input: [null], output: null },
		{ input: ["programming"], output: "Programming" },
		{ input: ["hELLO"], output: "Hello" },
		{ input: ["_ElLo"], output: "_ello" }
	],
	cleanObject: [
		{ input: [{}], output: {} },
		{ input: [{ a: null }], output: {} },
		{ input: [{ a: undefined, b: 10 }], output: { b: 10 } },
		{ input: [{ a: "me", b: true, c: false, d: "" }], output: { a: "me", b: true, c: false } }
	],
	arrayTesting: [
		{ input: [[1, 2, 3, 4, 5, 6, 7, 8], (n) => n < 0, "some"], output: false },
		{ input: [[1, 2, 3, 4, 5, 6, 7, 8], (n) => n % 2 === 0, "some"], output: true },
		{ input: [[], (n) => n % 2 === 0, "some"], output: true }
	]
}

Object.keys(FUNCTIONS).forEach((functionName) => {
	const f: () => any = utilFunctions[functionName]
	const functionTestData = FUNCTIONS[functionName]

	if (!f) throw new Error(`Function with name ${functionName}, is not found inside src/utils.ts`)

	describe(`Testing ${functionName}`, () => {
		for (const testData of functionTestData) {
			test(`${functionName}(${testData.input}) should be ${testData.output}`, () => {
				const output = f.call(null, ...testData.input)

				if (typeof output === "object") {
					expect(output).toEqual(testData.output)
				} else {
					expect(output).toBe(testData.output)
				}
			})
		}
	})
})
