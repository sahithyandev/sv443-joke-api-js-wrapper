var KeyboardMaster = (() => {
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };

  // src/index.ts
  var require_src = __commonJS((exports, module) => {
    const API_HOME = "https://sv443.net/jokeapi/v2/joke/";
    function validateReqOptions(options) {
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
    function getJokes(options) {
      if (options == void 0) {
        throw "options has to be given";
      }
      let apiReqUrl = API_HOME;
      if (validateReqOptions(options)) {
        return fetch(apiReqUrl);
      }
    }
    module.exports = {
      getJokes
    };
  });
  return require_src();
})();
//# sourceMappingURL=index.js.map
