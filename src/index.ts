import { requestOptions } from "./types";
const fetch = require("node-fetch");

const API_HOME = "https://sv443.net/jokeapi/v2/joke/";
// TK Make it dynamic
const MAX_ID_NUMBER = 291;
const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

function validateReqOptions(options: requestOptions) {
    const rules: { [key: string]: string } = {};

    Object.keys(rules).forEach((key) => {
        console.log(eval(key));
        if (eval(key)) {
            throw rules[key];
        }
    });

    if (Math.min(options.idRange?.from, options.idRange?.to) < 0) {
        throw "`idRange` values must be a non-negative number";
    }
    if (options.idRange?.from > options.idRange?.to) {
        throw "in `idRange`, `from` value must be smaller `to` value";
    }
    if (options.idRange?.to > MAX_ID_NUMBER) {
        throw `in 'idRange', 'to' value can't be higher than ${MAX_ID_NUMBER}`;
    }

    if (options.amount < 1) {
        throw "`amount` can't be less than 1";
    }

    return true;
}

function getJokes(options: requestOptions) {
    if (options === undefined) {
        throw "You have to pass the options as a parameter";
    }
    // set default values for undefined
    if (options.categories === undefined) options.categories = "Any";
    if (options.language === undefined) options.language = "en";
    if (options.jokeType === undefined) options.jokeType = "any";
    if (options.responseFormat === undefined) options.responseFormat = "json";
    if (options.amount === undefined) options.amount = 1;

    let apiReqUrl = API_HOME;
    apiReqUrl +=
        typeof options.categories === "string"
            ? capitalize(options.categories)
            : options.categories.map((v) => capitalize(v as string)).join(",");

    let params = {
        amount: options.amount,
    };
    apiReqUrl +=
        "?" +
        Object.entries(params)
            .map(([key, v]) => `${key}=${v}`)
            .join("&");

    // do validation
    if (validateReqOptions(options)) {
        // query it
        return fetch(apiReqUrl);
    }
    return null;
}

export { getJokes };
