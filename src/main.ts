import { requestOptions, strictRequestOptions, Error, ErrorMessages, JokeAPIParams } from "./types";
import { capitalize } from "./utils";
import { API_HOME } from './values';
import { StrObject } from './../global/types'

const fetch = require("node-fetch");

function validateReqOptions(options: strictRequestOptions): Error | null {
    const rules: StrObject<Error> = {
        "options.amount < 1": {
            message: ErrorMessages.INVALID_AMOUNT,
            description: "`amount` can't be less than 1",
        },
        "!Number.isSafeInteger(options.amount)": {
            message: ErrorMessages.INVALID_AMOUNT,
            description: "`amount` must be an integer"
        }
    };

    for (let rule of Object.keys(rules)) {
        if (eval(rule)) return rules[rule];
    }

    // TK Check these with fewer lines of code
    if (options.idRange?.from && options.idRange?.to) {
        if (Math.min(options.idRange.from, options.idRange.to) < 0) {
            return {
                message: ErrorMessages.INVALID_ID_RANGE,
                description: "`idRange` values must be a non-negative number",
            };
        }
        if (options.idRange.from > options.idRange.to) {
            return {
                message: ErrorMessages.INVALID_ID_RANGE,
                description:
                    "in `idRange`, `from` value must be smaller `to` value",
            };
        }
    }

    return null;
}

export function getJokes(options?: requestOptions): Promise<Response> | null {
    if (options === undefined) {
        options = {};
        console.warn(
            "Options for getJokes() is not defined. The default options will be used"
        );
    }

    if (options.categories === undefined || options.categories.length == 0)
        options.categories = "Any";
    if (options.language === undefined) options.language = "en";
    if (options.jokeType === undefined) options.jokeType = 'any';
    if (options.responseFormat === undefined) options.responseFormat = "json";
    if (options.amount === undefined) options.amount = 1;
    if (options.flags === undefined || options.flags.length == 0)
        options.flags = "";
    if (options.searchString === '') options.searchString = undefined

    let apiReqUrl = API_HOME + "joke/";
    apiReqUrl +=
        options.categories === "Any"
            ? capitalize(options.categories)
            : options.categories.map((v) => capitalize(v as string)).join(",");

    const params: JokeAPIParams = {
        amount: options.amount,
        lang: options.language,
        format: options.responseFormat,
        idRange:
            options.idRange?.from && options.idRange?.to
                ? `${options.idRange.from}-${options.idRange.to}`
                : undefined,
        contains: options.searchString,
        type: options.jokeType === "any" ? undefined : options.jokeType,
        blackListFlags:
            typeof options.flags === "string" ? undefined : options.flags.join(","),
    };

    apiReqUrl +=
        "?" +
        Object.entries(params)
            .filter(([_, v]) => v !== undefined)
            .map(([key, v]) => `${key}=${v}`)
            .join("&");

    // do validation
    // TK why not validate the params instead of options?
    let validationError = validateReqOptions(<strictRequestOptions>options);
    if (validationError) {
        throw validationError;
    } else {
        // query it
        return fetch(apiReqUrl);
    }
}