'use strict';

module.exports = function () {
  return {
    files: [
      // Application code
      { pattern: 'lib/**/*.js', load: false },
      // Support code
      { pattern: 'mocha-setup.js', load: false, instrument: false }
    ],
    tests: [
      'spec/**/*.js'
    ],
    env: {
      type: 'node'
    },
    bootstrap: function () {
      require('./mocha-setup');
    },
    teardown: function () {
    },
    testFramework: 'mocha'
  };
};