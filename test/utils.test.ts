import * as utilFunctions from "./../src/utils"
import { FunctionTestData } from "./types"
import { StrObject } from "../src/types"

const FUNCTIONS: StrObject<FunctionTestData[]> = {
	capitalize: [
		{ input: "", output: "" },
		{ input: null, output: null },
		{ input: "programming", output: "Programming" },
		{ input: "hELLO", output: "Hello" },
		{ input: "_ElLo", output: "_ello" }
	],
	cleanObject: [
		{ input: {}, output: {} },
		{ input: { a: null }, output: {} },
		{ input: { a: undefined, b: 10 }, output: { b: 10 } },
		{ input: { a: "me", b: true, c: false, d: "" }, output: { a: "me", b: true, c: false } }
	]
}

for (let functionName in FUNCTIONS) {
	let f: Function = utilFunctions[functionName]
	let functionTestData = FUNCTIONS[functionName]

	if (!f) throw `Function with name ${functionName}, is not found inside src/utils.ts`

	describe(`Testing ${functionName}`, () => {
		for (let testData of functionTestData) {
			test(`${functionName}(${testData.input}) should be ${testData.output}`, () => {
				let output = f.call(null, testData.input)

				if (typeof output === "object") {
					expect(output).toEqual(testData.output)
				} else {
					expect(output).toBe(testData.output)
				}
			})
		}
	})
}
