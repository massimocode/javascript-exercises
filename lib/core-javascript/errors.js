"use strict";

// This function takes in an array of key-value pair objects and returns a dictionary
// of the keys to their values.
// For example an input of [{ key: 'prop1', value: 'value1' }, { key: 'prop2', value: 'value2' }]
// would result in { prop1: 'value1', prop2: 'value2' };
// If the user provides duplicate keys then throw an error with the message 'You cannot provide duplicate keys'
function createDictionary(input) {}

// validateCustomer is an existing function in the system.
// The validateCustomer function validates a customer and returns true
// if the customer is valid and throws an error if the customer is not valid.
// The goal of this exercise is to create an isCustomerValid function that returns
// true if the customer is valid and false if the customer is not valid. It should use
// the existing validateCustomer function (which is passed in as the first parameter).
// We do not want this function to throw an error so the goal of this exercise
// is to hide that behaviour and return false instead.
function isCustomerValid(validateCustomer, customer) {}

module.exports = {
  createDictionary,
  isCustomerValid
};
