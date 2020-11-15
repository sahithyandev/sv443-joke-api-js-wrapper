import * as utilFunctions from "./../src/utils"
import { FunctionTestData } from "./types"
import { StrObject } from "../src/types"

const FUNCTIONS: StrObject<FunctionTestData[]> = {
	capitalize: [
		{ input: [""], output: "" },
		{ input: [null], output: null },
		{ input: ["programming"], output: "Programming" },
		{ input: ["hELLO"], output: "Hello" },
		{ input: ["_ElLo"], output: "_ello" }
	]
}

for (let functionName in FUNCTIONS) {
	let f: Function = utilFunctions[functionName]
	let functionTestData = FUNCTIONS[functionName]

	if (!f) throw `Function with name ${functionName}, is not found inside src/utils.ts`

	describe(`Testing ${f}`, () => {
		for (let testData of functionTestData) {
			test(`${functionName}(${testData.input}) should be ${testData.output}`, () => {
				let output = f.call(null, ...testData.input)

				expect(output).toBe(testData.output)
			})
		}
	})
}
