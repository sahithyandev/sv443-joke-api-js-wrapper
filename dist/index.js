"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_HOME = "https://sv443.net/jokeapi/v2/joke/";
// TK Make it dynamic
var MAX_ID_NUMBER = 291;
function validateReqOptions(options) {
    var _a, _b, _c, _d, _e, _f;
    // atleast one has to be true
    if (!(((_a = options.jokeType) === null || _a === void 0 ? void 0 : _a.single) || ((_b = options.jokeType) === null || _b === void 0 ? void 0 : _b.twopart))) {
        throw "in `jokeType`, `single` or `twopart` has to be true. Atleast one.";
    }
    if (Math.min((_c = options.idRange) === null || _c === void 0 ? void 0 : _c.from, (_d = options.idRange) === null || _d === void 0 ? void 0 : _d.to) < 0) {
        throw "`idRange` values must be a non-negative number";
    }
    if (((_e = options.idRange) === null || _e === void 0 ? void 0 : _e.from) > ((_f = options.idRange) === null || _f === void 0 ? void 0 : _f.to)) {
        throw "in `idRange`, `from` value must be smaller `to` value";
    }
    if (options.amount < 1) {
        throw "`amount` can't be less than 1";
    }
    return true;
}
function getJokes(options) {
    if (options == undefined) {
        throw "options has to be given";
    }
    var apiReqUrl = API_HOME;
    // do validation
    if (validateReqOptions(options)) {
        // query it
        return fetch(apiReqUrl);
    }
}
// @ts-ignore
module.exports = {
    getJokes: getJokes,
};
