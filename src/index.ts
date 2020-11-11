import { requestOptions, strictRequestOptions } from "./types";
import { capitalize } from "./utils";
const fetch = require("node-fetch");

export const API_HOME = "https://sv443.net/jokeapi/v2/";
// TK Make it dynamic
export const MAX_ID_NUMBER = 257;

function validateReqOptions(options: strictRequestOptions) {
    const rules: { [key: string]: string } = {};

    Object.keys(rules).forEach((key) => {
        console.log(eval(key));
        if (eval(key)) {
            throw rules[key];
        }
    });

    // TK Check these with fewer lines of code
    if (Math.min(options.idRange.from, options.idRange.to) < 0) {
        throw "`idRange` values must be a non-negative number";
    }
    if (options.idRange.from > options.idRange.to) {
        throw "in `idRange`, `from` value must be smaller `to` value";
    }
    if (options.idRange.to > MAX_ID_NUMBER) {
        throw `in 'idRange', 'to' value can't be higher than ${MAX_ID_NUMBER}`;
    }

    if (options.amount < 1) {
        throw "`amount` can't be less than 1";
    }

    return true;
}

export function getJokes(options?: requestOptions) {
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
    if (options.idRange === undefined) {
        options.idRange = {
            from: 0,
            to: MAX_ID_NUMBER,
        };
    } else {
        if (options.idRange.from === undefined) options.idRange.from = 0;
        if (options.idRange.to === undefined)
            options.idRange.to = MAX_ID_NUMBER;
    }

    let apiReqUrl = API_HOME + "joke/";
    apiReqUrl +=
        options.categories === "Any"
            ? capitalize(options.categories)
            : options.categories.map((v) => capitalize(v as string)).join(",");

    const params = {
        amount: options.amount,
        lang: options.language,
        format: options.responseFormat,
        idRange: `${options.idRange.from}-${options.idRange.to}`,
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
            .map(([key, v]) => `${key}=${v}`)
            .join("&");

    // do validation
    if (validateReqOptions(<strictRequestOptions>options)) {
        // query it
        return fetch(apiReqUrl);
    }
    return null;
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
