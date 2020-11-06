import { requestOptions } from "./data-types";

const API_HOME = "https://sv443.net/jokeapi/v2/joke/";
// TK Make it dynamic
const MAX_ID_NUMBER = 291;

function validateReqOptions(options: requestOptions) {
    // atleast one has to be true
    if (!(options.jokeType?.single || options.jokeType?.twopart)) {
        throw "in `jokeType`, `single` or `twopart` has to be true. Atleast one.";
    }

    if (Math.min(options.idRange?.from, options.idRange?.to) < 0) {
        throw "`idRange` values must be a non-negative number";
    }
    if (options.idRange?.from > options.idRange?.to) {
        throw "in `idRange`, `from` value must be smaller `to` value";
    }

    if (options.amount < 1) {
        throw "`amount` can't be less than 1";
    }

    return true;
}

function getJokes(options: requestOptions) {
    if (options == undefined) {
        throw "options has to be given";
    }

    let apiReqUrl = API_HOME;

    // do validation
    if (validateReqOptions(options)) {
        // query it
        return fetch(apiReqUrl);
    }
}

// @ts-ignore
module.exports = {
    getJokes,
};
