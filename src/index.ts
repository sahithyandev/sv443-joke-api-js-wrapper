import { requestOptions, strictRequestOptions, Error } from "./types";
import { capitalize } from "./utils";
const fetch = require("node-fetch");

export const API_HOME = "https://sv443.net/jokeapi/v2/";

function validateReqOptions(options: strictRequestOptions): Error | null {
    const rules: { [key: string]: Error } = {
        "options.amount < 1": {
            errorMessage: "`amount` can't be less than 1",
        },
    };

    for (let rule of Object.keys(rules)) {
        if (eval(rule)) return rules[rule];
    }

    // TK Check these with fewer lines of code
    if (options.idRange?.from && options.idRange?.to) {
        if (Math.min(options.idRange.from, options.idRange.to) < 0) {
            return {
                errorMessage: "`idRange` values must be a non-negative number",
            };
        }
        if (options.idRange.from > options.idRange.to) {
            return {
                errorMessage:
                    "in `idRange`, `from` value must be smaller `to` value",
            };
        }
    }
    // @disabled because MAX_ID_NUMBER is not a constant
    // if (options.idRange.to > MAX_ID_NUMBER) {
    //     throw `in 'idRange', 'to' value can't be higher than ${MAX_ID_NUMBER}`;
    // }

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
    if (options.jokeType === undefined) options.jokeType = "any";
    if (options.responseFormat === undefined) options.responseFormat = "json";
    if (options.amount === undefined) options.amount = 1;
    if (options.flags === undefined || options.flags.length == 0)
        options.flags = "";

    // @disabled MAX_ID_NUMBER is not constant
    // if (options.idRange === undefined) {
    //     options.idRange = {
    //         from: 0,
    //         to: MAX_ID_NUMBER,
    //     };
    // } else {
    //     if (options.idRange.from === undefined) options.idRange.from = 0;
    //     if (options.idRange.to === undefined)
    //         options.idRange.to = MAX_ID_NUMBER;
    // }

    let apiReqUrl = API_HOME + "joke/";
    apiReqUrl +=
        options.categories === "Any"
            ? capitalize(options.categories)
            : options.categories.map((v) => capitalize(v as string)).join(",");

    const params = {
        amount: options.amount,
        lang: options.language,
        format: options.responseFormat,
        idRange:
            options.idRange?.from && options.idRange?.to
                ? `${options.idRange.from}-${options.idRange.to}`
                : null,
        contains: [undefined, ""].includes(options.searchString)
            ? null
            : options.searchString,
        type: options.jokeType === "any" ? null : options.jokeType,
        blackListFlags:
            typeof options.flags === "string" ? null : options.flags.join(","),
    };
    apiReqUrl +=
        "?" +
        Object.entries(params)
            .filter(([_, v]) => v !== null)
            .map(([key, v]) => `${key}-${v}`)
            .join("&");

    // do validation
    let validationError = validateReqOptions(<strictRequestOptions>options);
    if (validationError) {
        throw validationError;
    } else {
        // query it
        return fetch(apiReqUrl);
    }
}

// TK make them dynamic
export const AVAILABLE_CATEGORIES = [
    "Programming",
    "Miscellaneous",
    "Dark",
    "Pun",
    "Spooky",
    "Christmas",
];
export const AVAILABLE_FLAGS = [
    "nsfw",
    "religious",
    "political",
    "racis",
    "sexist",
];
