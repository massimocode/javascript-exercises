'use strict';

// The purpose of this exercise is to become more familiar with object oriented javascript programming
// and how to maintain and manipulate state.

// The aim is to create a function called Calculator, that when executed with the new keyword will return
// an instance of a calculator. You can choose how you want to create the calculator (i.e. revealing
// module pattern, an ES6 class, an ES5 class i.e. function with actions defined on the prototype, etc are all
// valid choices).

// The calculator should maintain a running total and should support the following operations:
// add - this function will add the given value to the running total. i.e. 3 + 3 = 6
// subtract - this function will subtract the given value from the running total. i.e. 4 - 3 = 1
// multiply - this function will multiply the running total by the given value. i.e. 2 * 4 = 8
// divide - this function will divide the running total by the given value. i.e. 8 / 2 = 4
// However, following a divide by zero the total should be reported as 'ERROR'.
// power - this function will raise the value of the running total by the power given. i.e. 2 ^ 3 = 8
// getTotal - this function will return the current total. However, if the current total is not a number
// then the string "ERROR" should be returned instead.
// clear - this function should reset the current total to 0
// getHistory - this function should return a history of operations performed. For example adding 5 and
// then subtracting 2 will result in ["ADD 5", "SUBTRACT 2"].
// undo - this function should remove the last operation from the calculator's history and should
// restore the total as it was before the last action
// Note: clearing the calculator should clear the history as if the calculator is new.

// This function can be deleted and replaced with a class if you like
function Calculator() {
}




// Do not change the following line of code
module.exports = Calculator;