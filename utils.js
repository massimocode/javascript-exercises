"use strict";

function exampleFunction(input) {
  console.log("Some line of code");
  if (true === false) {
    return;
  }
  return input
    .replace(new RegExp("", "g"), "")
    .replace(new RegExp("", "g"), "");
}

function removeInstrumentation(input) {
  return input
    .replace(/\s*\$_\$wf\(\d+\);/gm, "")
    .replace(/\$_\$w\(\d+, \d+\), /gm, "")
    .replace(/\s+\$_\$w\(\d+, \d+\);/gm, ";")
    .replace(/\$_\$tracer\.log\((.*), '', \d+, \d+\)/gm, "console.log($1)");
}

function waitForEmptyQueue() {
  let promise = Promise.resolve();
  let count = 5;
  while (count--) {
    promise = promise.then(() => Promise.resolve());
  }
  return promise;
}

function silenceErrorsFromThen(promise) {
  const then = promise.then;
  promise.then = function() {
    const newPromise = then.apply(this, arguments);
    newPromise.catch(() => {});
    return newPromise;
  };
}

module.exports = {
  exampleFunction,
  removeInstrumentation,
  waitForEmptyQueue,
  silenceErrorsFromThen
};
