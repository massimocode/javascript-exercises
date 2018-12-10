"use strict";

let expect = require("chai").expect;
let arrays = require("../../lib/core-javascript/arrays");

describe("Arrays", function() {
  describe("Get Empty Array", function() {
    it("It should return an empty array", function() {
      expect(arrays.getEmptyArray()).to.deep.equal([]);
    });
  });

  describe("Get Number Of Items", function() {
    it("Given 1 items, it should return 1", function() {
      expect(arrays.getNumberOfItems([1])).to.equal(1);
    });

    it("Given 3 items, it should return 3", function() {
      expect(arrays.getNumberOfItems([1, 2, 3])).to.equal(3);
    });

    it("Given 5 items, it should return 5", function() {
      expect(arrays.getNumberOfItems(["a", "b", "c", "d", "e"])).to.equal(5);
    });

    it("Given null, it should return null", function() {
      expect(arrays.getNumberOfItems(null)).to.be.null;
    });

    it("Given {}, it should return null", function() {
      expect(arrays.getNumberOfItems({})).to.be.null;
    });
  });

  describe("Add item to end of existing array", function() {
    it("Given [1] and 2, it should add 2 to the end of the array and should return true", function() {
      var array = [1];
      var wasItemAdded = arrays.addItemToEndOfArray(array, 2);
      expect(wasItemAdded).to.be.true;
      expect(array).to.deep.equal([1, 2]);
    });

    it('Given ["a", "b", "c"] and 4, it should add 4 to the end of the array and should return true', function() {
      var array = ["a", "b", "c"];
      var wasItemAdded = arrays.addItemToEndOfArray(array, 4);
      expect(wasItemAdded).to.be.true;
      expect(array).to.deep.equal(["a", "b", "c", 4]);
    });

    it("Given [] and 4, it should add 4 to the end of the array and should return true", function() {
      var array = [];
      var wasItemAdded = arrays.addItemToEndOfArray(array, 4);
      expect(wasItemAdded).to.be.true;
      expect(array).to.deep.equal([4]);
    });

    it("Given null and 4, it should return false", function() {
      var wasItemAdded = arrays.addItemToEndOfArray(null, 4);
      expect(wasItemAdded).to.be.false;
    });

    it("Given {} and 4, it should return false", function() {
      var wasItemAdded = arrays.addItemToEndOfArray({}, 4);
      expect(wasItemAdded).to.be.false;
    });
  });

  describe("Add item to beginning of existing array", function() {
    it("Given [1] and 2, it should add 2 to the start of the array and should return true", function() {
      var array = [1];
      var wasItemAdded = arrays.addItemToStartOfArray(array, 2);
      expect(wasItemAdded).to.be.true;
      expect(array).to.deep.equal([2, 1]);
    });

    it('Given ["a", "b", "c"] and 4, it should add 4 to the start of the array and should return true', function() {
      var array = ["a", "b", "c"];
      var wasItemAdded = arrays.addItemToStartOfArray(array, 4);
      expect(wasItemAdded).to.be.true;
      expect(array).to.deep.equal([4, "a", "b", "c"]);
    });

    it("Given [] and 4, it should add 4 to the start of the array and should return true", function() {
      var array = [];
      var wasItemAdded = arrays.addItemToStartOfArray(array, 4);
      expect(wasItemAdded).to.be.true;
      expect(array).to.deep.equal([4]);
    });

    it("Given null and 4, it should return false", function() {
      var wasItemAdded = arrays.addItemToStartOfArray(null, 4);
      expect(wasItemAdded).to.be.false;
    });

    it("Given {} and 4, it should return false", function() {
      var wasItemAdded = arrays.addItemToStartOfArray({}, 4);
      expect(wasItemAdded).to.be.false;
    });
  });

  describe("Get item from start of array", function() {
    it('Given ["a", "b", "c"] it should return "a" without altering the original array', function() {
      var array = ["a", "b", "c"];
      var item = arrays.getItemFromStartOfArray(array);
      expect(item).to.equal("a");
      expect(array).to.deep.equal(["a", "b", "c"]);
    });

    it("Given [1, 2, 3] it should return 1 without altering the original array", function() {
      var array = [1, 2, 3];
      var item = arrays.getItemFromStartOfArray(array);
      expect(item).to.equal(1);
      expect(array).to.deep.equal([1, 2, 3]);
    });

    it("Given [] it should return null", function() {
      var item = arrays.getItemFromStartOfArray([]);
      expect(item).to.be.null;
    });

    it("Given null it should return null", function() {
      var item = arrays.getItemFromStartOfArray(null);
      expect(item).to.be.null;
    });

    it("Given {} it should return null", function() {
      var item = arrays.getItemFromStartOfArray({});
      expect(item).to.be.null;
    });
  });

  describe("Get item from end of array", function() {
    it('Given ["a", "b", "c"] it should return "c" without altering the original array', function() {
      var array = ["a", "b", "c"];
      var item = arrays.getItemFromEndOfArray(array);
      expect(item).to.equal("c");
      expect(array).to.deep.equal(["a", "b", "c"]);
    });

    it("Given [1, 2, 3] it should return 3 without altering the original array", function() {
      var array = [1, 2, 3];
      var item = arrays.getItemFromEndOfArray(array);
      expect(item).to.equal(3);
      expect(array).to.deep.equal([1, 2, 3]);
    });

    it("Given [] it should return null", function() {
      var item = arrays.getItemFromEndOfArray([]);
      expect(item).to.be.null;
    });

    it("Given null it should return null", function() {
      var item = arrays.getItemFromEndOfArray(null);
      expect(item).to.be.null;
    });

    it("Given {} it should return null", function() {
      var item = arrays.getItemFromEndOfArray({});
      expect(item).to.be.null;
    });
  });

  describe("Remove item from start of array", function() {
    it('Given ["a", "b", "c"] it should return "a" and remove "a" from the original array', function() {
      var array = ["a", "b", "c"];
      var item = arrays.removeItemFromStartOfArray(array);
      expect(item).to.equal("a");
      expect(array).to.deep.equal(["b", "c"]);
    });

    it("Given [1, 2, 3] it should return 1 and remove 1 from the original array", function() {
      var array = [1, 2, 3];
      var item = arrays.removeItemFromStartOfArray(array);
      expect(item).to.equal(1);
      expect(array).to.deep.equal([2, 3]);
    });

    it("Given [] it should return null", function() {
      var item = arrays.removeItemFromStartOfArray([]);
      expect(item).to.be.null;
    });

    it("Given null it should return null", function() {
      var item = arrays.removeItemFromStartOfArray(null);
      expect(item).to.be.null;
    });

    it("Given {} it should return null", function() {
      var item = arrays.removeItemFromStartOfArray({});
      expect(item).to.be.null;
    });
  });

  describe("Remove item from end of array", function() {
    it('Given ["a", "b", "c"] it should return "c" and remove "c" from the original array', function() {
      var array = ["a", "b", "c"];
      var item = arrays.removeItemFromEndOfArray(array);
      expect(item).to.equal("c");
      expect(array).to.deep.equal(["a", "b"]);
    });

    it("Given [1, 2, 3] it should return 3 and remove 3 from the original array", function() {
      var array = [1, 2, 3];
      var item = arrays.removeItemFromEndOfArray(array);
      expect(item).to.equal(3);
      expect(array).to.deep.equal([1, 2]);
    });

    it("Given [] it should return null", function() {
      var item = arrays.removeItemFromEndOfArray([]);
      expect(item).to.be.null;
    });

    it("Given null it should return null", function() {
      var item = arrays.removeItemFromEndOfArray(null);
      expect(item).to.be.null;
    });

    it("Given {} it should return null", function() {
      var item = arrays.removeItemFromEndOfArray({});
      expect(item).to.be.null;
    });
  });

  describe("Remove item from anywhere in existing array", function() {
    it("Given [1, 2] and 2, it should remove 2 from the array and should return 1", function() {
      var array = [1, 2];
      var itemsRemoved = arrays.removeItemFromArray(array, 2);
      expect(itemsRemoved).to.equal(1);
      expect(array).to.deep.equal([1]);
    });

    it("Given [1, 1, 2, 3] and 1, it should remove 1 from the array and should return 2", function() {
      var array = [1, 1, 2, 3];
      var itemsRemoved = arrays.removeItemFromArray(array, 1);
      expect(itemsRemoved).to.equal(2);
      expect(array).to.deep.equal([2, 3]);
    });

    it('Given ["a", "b", "c", 4] and 4, it should remove 4 from the array and should return 1', function() {
      var array = ["a", "b", "c", 4];
      var itemsRemoved = arrays.removeItemFromArray(array, 4);
      expect(itemsRemoved).to.equal(1);
      expect(array).to.deep.equal(["a", "b", "c"]);
    });

    it('Given ["a", "b", "c"] and 4, it should not alter the array as it does not contain 4 and should return 0', function() {
      var array = ["a", "b", "c"];
      var itemsRemoved = arrays.removeItemFromArray(array, 4);
      expect(itemsRemoved).to.equal(0);
      expect(array).to.deep.equal(["a", "b", "c"]);
    });

    it("Given null and 4, it should return null", function() {
      var itemsRemoved = arrays.removeItemFromArray(null, 4);
      expect(itemsRemoved).to.be.null;
    });

    it("Given {} and 4, it should return null", function() {
      var itemsRemoved = arrays.removeItemFromArray({}, 4);
      expect(itemsRemoved).to.be.null;
    });

    it('Given ["a", "b", "c", "a", "b", "c"] and "a", it should remove both occurrences of "a" from the array and return 2', function() {
      var array = ["a", "b", "c", "a", "b", "c"];
      var itemsRemoved = arrays.removeItemFromArray(array, "a");
      expect(itemsRemoved).to.equal(2);
      expect(array).to.deep.equal(["b", "c", "b", "c"]);
    });
  });

  describe("Clone existing array", function() {
    it("Given [1, 2] it should return a new array containing [1, 2]", function() {
      var array = [1, 2];
      var result = arrays.clone(array);
      expect(result).not.to.equal(array);
      expect(result).to.deep.equal(array);
    });

    it('Given ["a", "b", "c", 4] it should return a new array containing ["a", "b", "c", 4]', function() {
      var array = ["a", "b", "c", 4];
      var result = arrays.clone(array);
      expect(result).not.to.equal(array);
      expect(result).to.deep.equal(array);
    });

    it("Given [{}, {}, {}] it should return a new array containing [{}, {}, {}]", function() {
      var array = [{}, {}, {}];
      var result = arrays.clone(array);
      expect(result).not.to.equal(array);
      expect(result).to.deep.equal(array);
    });

    it("Given {} it should return null", function() {
      var result = arrays.clone({});
      expect(result).to.be.null;
    });

    it("Given null it should return null", function() {
      var result = arrays.clone(null);
      expect(result).to.be.null;
    });
  });

  describe("Truncate (shorten)", function() {
    it("Given [1, 2, 3, 4, 5] and 2 it should shorten the array to [1, 2] and return 3", function() {
      var array = [1, 2, 3, 4, 5];
      var result = arrays.truncate(array, 2);
      expect(result).to.equal(3);
      expect(array).to.deep.equal([1, 2]);
      expect(array.length).to.equal(2);
    });

    it("Given [9, 8, 7, 6, 5, 4, 3, 2, 1] and 3 it should shorten the array to [9, 8, 7] and return 6", function() {
      var array = [9, 8, 7, 6, 5, 4, 3, 2, 1];
      var result = arrays.truncate(array, 3);
      expect(result).to.equal(6);
      expect(array).to.deep.equal([9, 8, 7]);
      expect(array.length).to.equal(3);
    });

    it("Given [1, 2, 3, 4] and 4 it should return 0", function() {
      var array = [1, 2, 3, 4];
      var result = arrays.truncate(array, 4);
      expect(result).to.equal(0);
      expect(array).to.deep.equal([1, 2, 3, 4]);
      expect(array.length).to.equal(4);
    });

    it("Given [1, 2, 3, 4] and 5 it should return false", function() {
      var array = [1, 2, 3, 4];
      var result = arrays.truncate(array, 5);
      expect(result).to.be.false;
      expect(array).to.deep.equal([1, 2, 3, 4]);
      expect(array.length).to.equal(4);
    });

    it('Given "hello" and 3 it should return null', function() {
      var parameter = "hello";
      var result = arrays.truncate(parameter, 3);
      expect(result).to.be.null;
      expect(parameter).to.equal("hello");
    });

    it("Given {} and 3 it should return null", function() {
      var parameter = {};
      var result = arrays.truncate(parameter, 3);
      expect(result).to.be.null;
      expect(parameter.length).to.be.undefined;
    });
  });
});
