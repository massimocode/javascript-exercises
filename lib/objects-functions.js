'use strict';

// This function should return an empty object
function getEmptyObject() {
}

// This function should return an object
// with a total property set to the given total
function getObjectWithTotalProperty(total) {
}

// This function should return an object
// with a playback function that returns 123
function getObjectWithPlaybackFunctionThatReturns123() {
}

// This function should return an object
// with a playback function that returns the given value
function getObjectWithPlaybackFunctionThatReturnsTheGivenValue(value) {
}

// This function should return an object
// with a function that is named according
// to the provided functionName and that returns 123
function getObjectWithGivenNamedFunctionThatReturns123(functionName) {
}

// This function should return an object
// with a function that is named according
// to the provided functionName and that returns the given value
function getObjectWithGivenNamedFunctionThatReturnsTheGivenValue(functionName, value) {
}

// This function should return a clone of the given object
function cloneObject(input) {
}

// This function should return an object that has a function
// for each of the input array's elements. The function should
// be named according to the element's functionName property
// and when executed should return the element's returnValue property.
function getObjectWithGivenNamedFunctionsThatReturnGivenValues(input) {
    
}

// This function should return an object that has a function
// for each of the input array's elements. The function should
// be named according to the element's functionName property
// and when executed should return the result of adding the element's
// value1 and value2 properties.
function getObjectWithGivenNamedFunctionsThatReturnAdditionOfGivenValues(input) {
}

// This function should return a new function.
// The new function should return the result of
// adding the value of this function's first argument
// to the value of the new function's first argument.  
function curriedAdd(value1) {
}

// This function should return a new function that
// returns the number of times it has been executed.
// For example, the first time the returned function is executed
// it should return 1. The second time, it should return 2.
// The third time it should return 3, etc... 
// If a start value is provided then it should begin
// counting from that number (instead of 1).
function counter(startValue) {
}

module.exports = {
    getEmptyObject,
    getObjectWithTotalProperty,
    getObjectWithPlaybackFunctionThatReturns123,
    getObjectWithPlaybackFunctionThatReturnsTheGivenValue,
    getObjectWithGivenNamedFunctionThatReturns123,
    getObjectWithGivenNamedFunctionThatReturnsTheGivenValue,
    cloneObject,
    getObjectWithGivenNamedFunctionsThatReturnGivenValues,
    getObjectWithGivenNamedFunctionsThatReturnAdditionOfGivenValues,
    curriedAdd,
    counter
};