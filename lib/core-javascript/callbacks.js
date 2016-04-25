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

// Exercise 4
// This is the same as Exercise 3 but with the following additional requirement:
// - calling getData might throw a synchronous error. If it does, you should
// report the error (console.error)
function exercise4(getData) {
}

// Exercise 5
// This is the same as Exercise 4 but with the following additional requirement:
// - There is a bug in getData which causes your callback to be called more than once!
// Not only is it called more than once, but sometimes the error callback is called after
// the success callback, and sometimes the success callback is called after the error callback.
// Unfortunately getData is part of a code library you depend on and you are unable to
// modify the code, so you need to make sure your callback is only called once.
function exercise5(getData) {
}

// Exercise 6
// In this exercise you are given a function called placeOrder.
// This function places a new order.

// This function takes 1 parameter which is a callback function
// that will be executed once the user is registered. The callback function
// is passed an order reference number as its first parameter.

// You are also given a function registerUser.
// This function registers a new user.

// This function takes 1 parameter which is a callback function
// that will be executed once the user is registered. The callback function
// is passed the user's ID as the first parameter.

// You should call the placeOrder function to place an order and
// call the registerUser function to register a user.
// When both operations are complete, you should log the following message
// to the console:
// "User {USER_ID} placed order {ORDER_REFERENCE}"
// where {USER_ID} is the user's ID returned by registerUser
// and {ORDER_REFERENCE} is the order reference returned by placeOrder
function exercise6(placeOrder, registerUser) {
}

module.exports = {
    exercise1,
    exercise2,
    exercise3,
    exercise4,
    exercise5,
    exercise6
};