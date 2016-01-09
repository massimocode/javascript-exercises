'use strict';

// The following function is supposed to return an array of functions
// that in turn return 1, 2, 3, 4, 5, etc until the number that was input.
// However, there is a subtle bug causing all of the functions to return the number that was input!
// You need to fix this bug so that each functions returns the number it was intended to.
// You are expected to solve this one quite trivially with the help of an ES6 keyword.
function getFunctionsThatReturnNumbers(finalNumber) {
    var arrayToReturn = [];
    var i;
    
    for (i = 1; i <= finalNumber; i++) {
        arrayToReturn.push(function () {
            return i;
        });
    }
    return arrayToReturn;
}

// This is a copy of the function above except this code is supposed to run on
// older javascript engines that don't support ES6 so you can't use ES6 keywords.
// Find another way to fix the bug!
function getFunctionsThatReturnNumbersOldFashioned(finalNumber) {
    var arrayToReturn = [];
    var i;
    
    for (i = 1; i <= finalNumber; i++) {
        arrayToReturn.push(function () {
            return i;
        });
    }
    return arrayToReturn;
}

module.exports = {
    getFunctionsThatReturnNumbers,
    getFunctionsThatReturnNumbersOldFashioned
};