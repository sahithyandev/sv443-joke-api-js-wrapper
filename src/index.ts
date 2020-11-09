import { requestOptions, strictRequestOptions } from "./types";
const fetch = require("node-fetch");

const API_HOME = "https://sv443.net/jokeapi/v2/joke/";
// TK Make it dynamic
const MAX_ID_NUMBER = 291;
const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

function validateReqOptions(options: strictRequestOptions) {
    const rules: { [key: string]: string } = {};

    Object.keys(rules).forEach((key) => {
        console.log(eval(key));
        if (eval(key)) {
            throw rules[key];
        }
    });

    if (Math.min(options.idRange.from, options.idRange.to) < 0) {
        throw "`idRange` values must be a non-negative number";
    }
    if (options.idRange.from > options.idRange.to) {
        throw "in `idRange`, `from` value must be smaller `to` value";
    }
    if (options.idRange.to > MAX_ID_NUMBER) {
        throw `in 'idRange', 'to' value can't be higher than ${MAX_ID_NUMBER}`;
    }

    if (options.amount !== undefined && options.amount < 1) {
        throw "`amount` can't be less than 1";
    }

    return true;
}

function getJokes(options?: requestOptions) {
    if (options === undefined) {
        options = {};
        console.warn(
            "Options for getJokes() is not defined. The default options will be used"
        );
    }
    // set default values for undefined
    if (options.categories === undefined) options.categories = "Any";
    if (options.language === undefined) options.language = "en";
    if (options.jokeType === undefined) options.jokeType = "any";
    if (options.responseFormat === undefined) options.responseFormat = "json";
    if (options.amount === undefined) options.amount = 1;
    if (options.flags === undefined) options.flags = "";
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

    let apiReqUrl = API_HOME;
    apiReqUrl +=
        options.categories === "Any"
            ? capitalize(options.categories)
            : options.categories.map((v) => capitalize(v as string)).join(",");

    let params = {
        amount: options.amount,
        lang: options.language,
        format: options.responseFormat,
        idRange: `${options.idRange.from}-${options.idRange.to}`,
        contains:
            options.searchString !== undefined ? options.searchString : null,
        type: options.jokeType === "any" ? null : options.jokeType,
        blackListFlags:
            typeof options.flags === "string" ? null : options.flags.join(","),
    };
    apiReqUrl +=
        "?" +
        Object.entries(params)
            .filter(([_, value]) => value !== null)
            .map(([key, v]) => `${key}=${v}`)
            .join("&");

    // do validation
    if (validateReqOptions(<strictRequestOptions>options)) {
        // query it
        return fetch(apiReqUrl);
    }
    return null;
}

export { getJokes };
