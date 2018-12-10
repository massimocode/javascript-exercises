"use strict";

module.exports = function() {
  return {
    files: [
      // Application code
      { pattern: "lib/**/*.js", load: false },
      // Support code
      { pattern: "mocha-setup.js", load: false, instrument: false },
      { pattern: "utils.js", load: false }
    ],
    tests: ["spec/**/*.spec.js", "*.spec.js"],
    env: {
      type: "node"
    },
    bootstrap: function() {
      require("./mocha-setup");
    },
    teardown: function() {},
    testFramework: "mocha"
  };
};
