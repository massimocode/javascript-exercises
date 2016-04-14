'use strict';

function getResolvedPromise() {
}

function getRejectedPromise() {
}

function getPendingPromise() {
}

function getPromiseResolvedWith(value) {
}

function getPromiseRejectedWith(value) {
}

// In this exercise you are given a promise and handlers for both resolution and rejection.
// When the promise resolves, you should call the resolution handlers with the resolution value.
// When the promise rejects, you should call the rejection handler with the rejection value.
// You should not return anything from this function.
function exercise1(promise, resolutionHandler, rejectionHandler) {
}

// This exercise is similar to Exercise 1 except for the following additional requirement:
// If executing the resolution handler throws an error or returns a rejected promise,
// you should call the rejection handler with the error or rejection value.
function exercise2(promise, resolutionHandler, rejectionHandler) {
}

module.exports = {
    getResolvedPromise,
    getRejectedPromise,
    getPendingPromise,
    getPromiseResolvedWith,
    getPromiseRejectedWith,
    exercise1,
    exercise2
};