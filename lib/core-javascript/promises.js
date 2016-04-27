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
function forkingPromises(promise, resolutionHandler, rejectionHandler) {
}

// This exercise is similar to Exercise 1 except for the following additional requirement:
// If executing the resolution handler throws an error or returns a rejected promise,
// you should call the rejection handler with the error or rejection value.
function promiseErrorChaining(promise, resolutionHandler, rejectionHandler) {
}

// Exercise 1
// In this exercise you are given a function called registerUser.
// This function registers a new user and returns a promise that resolves when the user has been registered.

// You should call the registerUser function to register a user and
// when the user is registered you should log "USER REGISTERED" to the console.
function exercise1(registerUser) {
}

// Exercise 2
// In this exercise you are given a function called placeOrder.
// This function places a new order and returns a promise
// which is resolved with the order reference number when the order
// has been placed.

// You should call the placeOrder function to place an order and
// when the order is placed you should log the order reference number to the console.
function exercise2(placeOrder) {
}

// Exercise 3
// In this exercise you are given a function called getData.
// This function gets data from the URL that you specify.

// This function takes the URL that you want to get data from and
// returns a promise that resolves with the data once the request is complete.
// The promise will reject if there is an error getting the data.

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
// This is the same as exercise 4, but do not use try/catch!
function exercise5(getData) {
}

// Exercise 6
// In this exercise you are given a function called placeOrder.
// This function places a new order.

// This function places a new order and returns a promise
// which is resolved with the order reference number when the order
// has been placed.

// You are also given a function registerUser.
// This function registers a new user and returns a promise that resolves
// with the user's ID when the user has been registered.

// You should call the placeOrder function to place an order and
// call the registerUser function to register a user.
// When both operations are complete, you should log the following message
// to the console:
// "User {USER_ID} placed order {ORDER_REFERENCE}"
// where {USER_ID} is the user's ID returned by registerUser
// and {ORDER_REFERENCE} is the order reference returned by placeOrder
function exercise6(placeOrder, registerUser) {
}

// Exercise 7
// In this exercise you will be writing some data to a database.

// You are given a function called connect. This function takes in
// a single parameter, being the address of the server to connect to,
// and returns a promise that is resolved with the connection once the connection has been
// established, or rejects with an error if there is an error making the connection.

// The connection is an object which has a function called openDatabase.
// openDatabase takes in the name of the database to open and returns a promise that
// resolves with the database if the database could be opened, or rejects with an error
// if there is an error opening the database.

// The database is an object which has a function called insertRecord.
// insertRecord takes in 2 parameters. The first parameter is the name of the collection
// to insert the recordinto. The second parameter is the record to insert.
// It returns a promise that resolves with the record ID when the record has been inserted,
// or rejects with an error if there is an error inserting the record.

// You should connect to the database server at mongodb://mongo-server.foo.com:44017
// and insert the record { status: "I'm ready!" } into the "status" collection of the "Master" database.
// If any errors occur at any stage, you should report them (using console.error).
// If the operation is successful, you should log the ID to the console (using console.log).
function exercise7(connect) {
}

module.exports = {
    getResolvedPromise,
    getRejectedPromise,
    getPendingPromise,
    getPromiseResolvedWith,
    getPromiseRejectedWith,
    forkingPromises,
    promiseErrorChaining,
    exercise1,
    exercise2,
    exercise3,
    exercise4,
    exercise5,
    exercise6,
    exercise7
};