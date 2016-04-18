'use strict';

// Exercise 1
// In this exercise you are given a function called registerUser.
// This function registers a new user.

// This function takes 1 parameter which is a callback function
// that will be executed once the user is registered.

// You should call the registerUser function to register a user and
// when the user is registered you should log "USER REGISTERED" to the console.
function exercise1(registerUser) {
}

// Exercise 2
// In this exercise you are given a function called placeOrder.
// This function places a new order.

// This function takes 1 parameter which is a callback function
// that will be executed once the user is registered. The callback function
// is passed an order reference number as its first parameter.

// You should call the placeOrder function to place an order and
// when the order is placed you should log the order reference number to the console.
function exercise2(placeOrder) {
}

// Exercise 3
// In this exercise you are given a function called getData.
// This function gets data from the URL that you specify.

// This function has the following 2 parameters:
// url: A string representing the URL from which you want to get data
// callback: A function that will be executed once the request is complete.

// The callback function's first parameter is either an error
// (if the request was not successful) or null (if the request was successful).
// The second parameter is the data (if the request was successful).

// You should use the getData function to get the data from the server at "someUrl".
// If the request is successful then you should print out the data to the console (console.log).
// If the request is not successful then you should report the error (console.error).
function exercise3(getData) {
}

module.exports = {
    exercise1,
    exercise2,
    exercise3
};