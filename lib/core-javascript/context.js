"use strict";

// The following function is supposed to return an array of functions
// that in turn return 1, 2, 3, 4, 5, etc until the number that was input.
// However, there is a subtle bug causing all of the functions to return a number
// that is 1 higher than the finalNumber that was input!
// You need to fix this bug so that each functions returns the number it was intended to.
// You are expected to solve this one quite trivially with the help of an ES6 keyword.
function getFunctionsThatReturnNumbers(finalNumber) {
  var arrayToReturn = [];
  var i;

  for (i = 1; i <= finalNumber; i++) {
    arrayToReturn.push(function() {
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
    arrayToReturn.push(function() {
      return i;
    });
  }
  return arrayToReturn;
}

// This function returns the getPrice function for the requested item.
// When this function is executed, it should return the price of the
// requested item. If the item is not found, then it should null should
// be returned, instead of a function.
// However, the code currently has a bug where the functions being returned
// produce errors when they are executed. You need to fix this bug.
function getCurrentPriceFunctionFor(itemName) {
  let item1 = {
    name: "Heavily Used Vintage Shoes",
    price: 12.99,
    getPrice: function() {
      return this.price;
    }
  };
  let item2 = {
    name: "Maxxi Perforated Running Trainers",
    price: 24.99,
    getPrice: function() {
      return this.price;
    }
  };
  let allItems = [item1, item2];
  let item = allItems.find(item => item.name === itemName);
  if (item !== undefined) {
    return item.getPrice;
  } else {
    return null;
  }
}

// The function below has 4 constructors inside it for different types of dragon.
// Calling the function with the type of dragon will return an instance of that dragon.
// However, when the function is executed there seems to be an error. You need to fix the
// bug and make the tests pass.
function getDragon(typeOfDragon) {
  function FireBreathingDragon() {
    this.name = "Fire Breathing Dragon";
  }

  function SmellyDragon() {
    this.name = "Smelly Dragon";
  }

  function BabyDragon() {
    this.name = "Baby Dragon";
  }

  function MysteriousDragon() {
    this.name = "Mysterious Dragon";
  }

  switch (typeOfDragon) {
    case "Fire Breathing":
      return FireBreathingDragon();
    case "Smelly":
      return SmellyDragon();
    case "Baby":
      return BabyDragon();
    default:
      return MysteriousDragon();
  }
}

// This function returns an array containing the numbers
// between start and end, inclusive.
// However, the function currently throws an error whenever it is executed.
// You need to fix this error.
function returnAnArrayOfNumbers(start, end) {
  let array = [];
  for (i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

module.exports = {
  getFunctionsThatReturnNumbers,
  getFunctionsThatReturnNumbersOldFashioned,
  getCurrentPriceFunctionFor,
  getDragon,
  returnAnArrayOfNumbers
};
