'use strict';

// This function should return 123
function return123() {
}

// This function should return the given value
function returnGivenValue(value) {
}

// This function should return a function that returns 123
function getFunctionThatReturns123() {
}

// This function should return a function that returns the given value
function getFunctionThatReturnsTheGivenValue(value) {
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

// This function should use the apply function to return
// the arguments array-like context object as a real array.
function returnArgumentsAsRealArrayUsingApply() {
}

// This function should use the call function to return
// the arguments array-like context object as a real array.
function returnArgumentsAsRealArrayUsingCall() {
}

// This function should call the functionToCall function with the given context,
// using the remaining arguments (for which parameters are not explicitly present) as the arguments to functionToCall
function callGivenFunctionWithGivenContextAndArguments(functionToCall, context) {
}

// This function should return a version of functionToCall that is bound to the
// given context and is automatically provided the given argument as its first argument
function returnAFunctionThatIsBoundToTheGivenContextAndArgument(functionToCall, context, argument) {
}

// This function should return a version of functionToCall that is bound to the
// given context and is automatically provided the remaining arguments (for which parameters
// are not explicitly present) as its arguments
function returnAFunctionThatIsBoundToTheGivenContextAndArguments(functionToCall, context) {
}

// This function takes in a node. Nodes are of the format { nodes: [] }, where the nodes array can contain more nodes,
// and in turn, those nodes can contain more nodes. This represents a "tree-like" structure. The countNodes function
// should, given a node, return the total number of nodes in the tree-like structure.
function countNodes(nodeGraph) {
}

module.exports = {
    return123,
    returnGivenValue,
    getFunctionThatReturns123,
    getFunctionThatReturnsTheGivenValue,
    curriedAdd,
    counter,
    returnArgumentsAsRealArrayUsingApply,
    returnArgumentsAsRealArrayUsingCall,
    callGivenFunctionWithGivenContextAndArguments,
    returnAFunctionThatIsBoundToTheGivenContextAndArgument,
    returnAFunctionThatIsBoundToTheGivenContextAndArguments,
    countNodes
};