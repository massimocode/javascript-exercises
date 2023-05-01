"use strict";

let chai = require("chai");
let sinonChai = require("sinon-chai");
chai.use(sinonChai);
const utils = require("./utils");

if (!Promise.defer) {
  Promise.defer = function() {
    let deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    deferred.promise.catch(() => {});
    utils.silenceErrorsFromThen(deferred.promise);
    return deferred;
  };
}

const all = Promise.all;
Promise.all = function() {
  const ret = all.apply(this, arguments);
  ret.catch(() => {});
  return ret;
};

const reject = Promise.reject;
Promise.reject = function() {
  const ret = reject.apply(this, arguments);
  ret.catch(() => {});
  return ret;
};
