'use strict';

let expect = require('chai').expect;
let karateChop = require('../../lib/katas/karate-chop');

describe('Karate Chop', function () {
    
    let array, arrayIndexOf;
    
    beforeEach(() => {
        // This is some setup to remind you that you aren't allowed to use indexOf.
        array = [];
        arrayIndexOf = Array.prototype.indexOf;
        Array.prototype.indexOf = function () {
            if (this === array)
                throw new Error('You are not allowed to use this method in this kata');
            return arrayIndexOf.apply(this, arguments);
        }
    });
    
    afterEach(() => {
        Array.prototype.indexOf = arrayIndexOf;
    });
    
    describe('While Loop', function () {

        describe('With an empty array', () => {

            it('When the array is empty it should return -1', function () {
                expect(karateChop.karateChopWhileLoop(3, array)).to.equal(-1);
            });
        });

        describe('With an array containing a single item', () => {
            beforeEach(() => {
                array.push(1);
            });

            it('When the item is not present it should return -1', function () {
                expect(karateChop.karateChopWhileLoop(3, array)).to.equal(-1);
            });

            it('When the item is present it should return the index', function () {
                expect(karateChop.karateChopWhileLoop(1, array)).to.equal(0);
            });
        });

        describe('With an array containing 3 items', () => {
            beforeEach(() => {
                array.push(1, 3, 5);
            });

            describe('When the item is present', () => {
                it('Given the first item it should return 0', () => {
                    expect(karateChop.karateChopWhileLoop(1, array)).to.equal(0);
                });
                
                it('Given the second item it should return 1', () => {
                    expect(karateChop.karateChopWhileLoop(3, array)).to.equal(1);
                });
                
                it('Given the third item it should return 2', () => {
                    expect(karateChop.karateChopWhileLoop(5, array)).to.equal(2);
                });
            });

            describe('When the item is not present', () => {
                it('Test Case 1 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(0, array)).to.equal(-1);
                });
                
                it('Test Case 2 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(2, array)).to.equal(-1);
                });
                
                it('Test Case 3 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(4, array)).to.equal(-1);
                });
                
                it('Test Case 4 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(6, array)).to.equal(-1);
                });
            });
        });

        describe('With an array containing 4 items', () => {
            beforeEach(() => {
                array.push(1, 3, 5, 7);
            });

            describe('When the item is present', () => {
                it('Given the first item it should return 0', () => {
                    expect(karateChop.karateChopWhileLoop(1, array)).to.equal(0);
                });
                
                it('Given the second item it should return 1', () => {
                    expect(karateChop.karateChopWhileLoop(3, array)).to.equal(1);
                });
                
                it('Given the third item it should return 2', () => {
                    expect(karateChop.karateChopWhileLoop(5, array)).to.equal(2);
                });
                
                it('Given the third item it should return 2', () => {
                    expect(karateChop.karateChopWhileLoop(7, array)).to.equal(3);
                });
            });

            describe('When the item is not present', () => {
                it('Test Case 1 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(0, array)).to.equal(-1);
                });
                
                it('Test Case 2 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(2, array)).to.equal(-1);
                });
                
                it('Test Case 3 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(4, array)).to.equal(-1);
                });
                
                it('Test Case 4 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(6, array)).to.equal(-1);
                });
                
                it('Test Case 5 - It should return -1', () => {
                    expect(karateChop.karateChopWhileLoop(8, array)).to.equal(-1);
                });
            });
        });
    });
});
