"use strict";

// Exercise 1
// In this exercise you are given a function called registerUser.
// This function registers a new user.

// This function takes 1 parameter which is a callback function
// that will be executed once the user is registered.

// You should call the registerUser function to register a user and
// when the user is registered you should log "USER REGISTERED" to the console.
function exercise1(registerUser) {}

// Exercise 2
// In this exercise you are given a function called placeOrder.
// This function places a new order.

// This function takes 1 parameter which is a callback function
// that will be executed once the order has been placed. The callback function
// is passed an order reference number as its first parameter.

// You should call the placeOrder function to place an order and
// when the order is placed you should log the order reference number to the console.
function exercise2(placeOrder) {}

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
function exercise3(getData) {}

// Exercise 4
// This is the same as Exercise 3 but with the following additional requirement:
// - calling getData might throw a synchronous error. If it does, you should
// report the error (console.error)
function exercise4(getData) {}

// Exercise 5
// This is the same as Exercise 4 but with the following additional requirement:
// - There is a bug in getData which causes your callback to be called more than once!
// Not only is it called more than once, but sometimes the error callback is called after
// the success callback, and sometimes the success callback is called after the error callback.
// Unfortunately getData is part of a code library you depend on and you are unable to
// modify the code, so you need to make sure your callback is only called once.
function exercise5(getData) {}

// Exercise 6
// In this exercise you are given a function called placeOrder.
// This function places a new order.

// This function takes 1 parameter which is a callback function
// that will be executed once the order has been placed. The callback function
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
function exercise6(placeOrder, registerUser) {}

// Exercise 7
// In this exercise you will be writing some data to a database.

// You are given a function called connect. This function takes in
// a single parameter, being the address of the server to connect to,
// and a callback function that is called when the connection has been
// established (in which case the callback will be passed the connection as the second parameter
// and null as the first parameter), or if there is an error making the connection
// (in which case the callback will be passed the error as the first parameter).

// The connection is an object which has a function called openDatabase.
// openDatabase takes in 2 parameters. The first parameter is the name of the database
// to open, and the second is a callback which is called when the database has been
// opened (in which case the callback will be passed the database as the second parameter
// and null as the first parameter), or if there is an error opening the database
// (in which case the callback will be passed the error as the first parameter).

// The database is an object which has a function called insertRecord.
// insertRecord takes in 3 parameters. The first parameter is the name of the collection
// to insert the recordinto. The second parameter is the record to insert.
// The third parameter is a callback that will be called when the record has been inserted
// (in which case the callback will be passed the record's ID as the second parameter
// and null as the first parameter) or if there is an error inserting the record
// (in which case the callback will be passed the error as the first parameter).

// You should connect to the database server at mongodb://mongo-server.foo.com:44017
// and insert the record { status: "I'm ready!" } into the "status" collection of the "Master" database.
// If any errors occur at any stage, you should report them (using console.error).
// If the operation is successful, you should log the ID to the console (using console.log).
function exercise7(connect) {}

// Exercise 8
// In this exercise you will be querying some data from a database
// and performing multiple operations based off the results of that query.

// You should connect to the Shop database and insert records the same way
// you did in exercise 7.

// However, the database also has a function called query. query takes in 2 parameters.
// The first parameter is the name of the collection to query. The second parameter
// is a callback that will be called when the results have been received
// (in which case the callback will be passed the results as an array as the second parameter
// and null as the first parameter) or if there is an error querying the collection
// (in which case the callback will be passed the error as the first parameter).

// You should connect to the database server at mongodb://mongo-server.foo.com:44017
// and read the records that are inside the 'products' collection of the 'Shop' database.
// The products are of the following format:
// { name: 'Some Product Name', stockLevel: 3 }

// When you have retrieved the products, you should check which products have a stockLevel less than 3.
// For each product that has a stockLevel less than 3, you should insert a record into the 'restocking'
// collection as follows { productName: X } where X is the name of the product that is low on stock.
// The records should be inserted in parallel (i.e. you should not wait for one to finish before inserting
// the next one).

// Once all operations are completed successfully without errors
// you should log to the console 'RESTOCKING JOB SUCCESSFUL'.
// If no products need restocking, you should not insert any restocking records and you should
// log to the console 'RESTOCKING JOB SUCCESSFUL' instead.
// If any errors occur, you should report all errors to the console (console.error for each one)
// and you should log to the console 'RESTOCKING JOB FAILED - SEE ERRORS' (with console.log).
function exercise8(connect) {}

// Exercise 9
// This exercise is the same as exercise 8, except that the insertRecords operation on
// the database can complete synchronously (i.e. your callback can be called before the
// insertRecords function call has returned). You need to keep this in mind when designing
// your solution.
function exercise9(connect) {}

// Exercise 10
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
// If more than 3000 milliseconds pass from the time you requested the data and your callback
// has not been called yet, then you should log to the console "TIMEOUT" and if the
// data arrives after this you should not log it to the console.
function exercise10(getData) {}

module.exports = {
  exercise1,
  exercise2,
  exercise3,
  exercise4,
  exercise5,
  exercise6,
  exercise7,
  exercise8,
  exercise9,
  exercise10
};
