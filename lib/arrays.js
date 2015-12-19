'use strict';

// This function should return a new empty array
function getEmptyArray(){
}

// This function should return the number of items in the given array
// It should return null if the parameter is not an array
function getNumberOfItems(array) {
}

// This function should add the given item to the end of the given array
// It should return true if the item was added to the array
// and false if the item was not added to the array
function addItemToEndOfArray(array, item) {
}

// This function should add the given item to the start of the given array
// It should return true if the item was added to the array
// and false if the item was not added to the array
function addItemToStartOfArray(array, item) {
}

// This function should return the item that is at the start of the array,
// without altering the original array.
// If the array is empty or is not an array, it should return null instead.
function getItemFromStartOfArray(array) {
}

// This function should return the item that is at the end of the array,
// without altering the original array.
// If the array is empty or is not an array, it should return null instead.
function getItemFromEndOfArray(array) {
}

// This function should return the item that is at the start of the array,
// removing the item from the array.
// If the array is empty or is not an array, it should return null instead.
function removeItemFromStartOfArray(array) {
}

// This function should return the item that is at the end of the array,
// removing the item from the array.
// If the array is empty or is not an array, it should return null instead.
function removeItemFromEndOfArray(array) {
}

// This function should remove the given item from the given array
// It should return the number of items that were removed from the array
// or null if the parameter was not an array
function removeItemFromArray(array, item) {
}

// This function should return a shallow clone of the given array,
// i.e. a new array containing the same values.
// It should return null if the value is not an array.
function clone(array){
}

// This function should shorten the array to the new length.
// It should return the number of elements deleted due to the operation,
// or 0 if the length is the same as the current length.
// If the new length is longer than the existing length,
// then the length should not be modified and the function should return false.
// If the parameter is not an array then the function should return null.
function truncate(array, newLength) {
}

module.exports = {
    getEmptyArray,
    getNumberOfItems,
    addItemToEndOfArray,
    addItemToStartOfArray,
    getItemFromStartOfArray,
    getItemFromEndOfArray,
    removeItemFromStartOfArray,
    removeItemFromEndOfArray,
    removeItemFromArray,
    clone,
    truncate
};