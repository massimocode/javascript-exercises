'use strict';

let expect = require('chai').expect;
let objectsAndFunctions = require('../../lib/core-javascript/objects-functions');

describe('Basic Objects', function () {

    describe('Get empty object', function () {
        it('Should return an empty object', function () {
            expect(objectsAndFunctions.getEmptyObject()).to.deep.equal({});
        });
    });

    describe('Get object with total property', function () {

        it('Should return an object with a "total" property set to 123', function () {
            expect(objectsAndFunctions.getObjectWithTotalProperty(123)).to.deep.equal({ total: 123 });
        });

        it('Should return an object with a "total" property set to 987', function () {
            expect(objectsAndFunctions.getObjectWithTotalProperty(987)).to.deep.equal({ total: 987 });
        });
    });

    describe('Get object with playback function that returns 123', function () {

        it('Should return an object with a playback function that returns 123', function () {
            var result = objectsAndFunctions.getObjectWithPlaybackFunctionThatReturns123();
            expect(result.playback()).to.equal(123);
        });
    });

    describe('Get object with playback function that returns the given value', function () {

        it('Given 123, should return an object with a playback function that returns 123', function () {
            var result = objectsAndFunctions.getObjectWithPlaybackFunctionThatReturnsTheGivenValue(123);
            expect(result.playback()).to.equal(123);
        });

        it('Given "abc", should return an object with a playback function that returns "abc"', function () {
            var result = objectsAndFunctions.getObjectWithPlaybackFunctionThatReturnsTheGivenValue("abc");
            expect(result.playback()).to.equal("abc");
        });

        it('Given an object, should return an object with a playback function that returns the given object', function () {
            var objectToReturn = {};
            var result = objectsAndFunctions.getObjectWithPlaybackFunctionThatReturnsTheGivenValue(objectToReturn);
            expect(result.playback()).to.equal(objectToReturn);
        });
    });

    describe('Get object with named function that returns 123', function () {

        it('Given "hello" should return an object with a "hello" function that returns 123', function () {
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturns123('hello');
            expect(result.hello()).to.equal(123);
        });

        it('Given "hello" should return an object with a "hello" function that returns 123', function () {
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturns123('my name');
            expect(result['my name']()).to.equal(123);
        });
    });

    describe('Get object with named function that returns the given value', function () {

        it('Given "playback" and 123, should return an object with a playback function that returns 123', function () {
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturnsTheGivenValue("playback", 123);
            expect(result.playback()).to.equal(123);
        });

        it('Given "playback" and abc", should return an object with a playback function that returns "abc"', function () {
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturnsTheGivenValue("playback", "abc");
            expect(result.playback()).to.equal("abc");
        });

        it('Given "playback" and an object, should return an object with a playback function that returns the given object', function () {
            var objectToReturn = {};
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturnsTheGivenValue("playback", objectToReturn);
            expect(result.playback()).to.equal(objectToReturn);
        });

        it('Given "some other name" and 123, should return an object with a "some other name" function that returns 123', function () {
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturnsTheGivenValue("some other name", 123);
            expect(result["some other name"]()).to.equal(123);
        });

        it('Given "some other name" and abc", should return an object with a playback function that returns "abc"', function () {
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturnsTheGivenValue("some other name", "abc");
            expect(result["some other name"]()).to.equal("abc");
        });

        it('Given "some other name" and an object, should return an object with a playback function that returns the given object', function () {
            var objectToReturn = {};
            var result = objectsAndFunctions.getObjectWithGivenNamedFunctionThatReturnsTheGivenValue("some other name", objectToReturn);
            expect(result["some other name"]()).to.equal(objectToReturn);
        });
    });

    describe('Clone object', function () {

        it('Should return an object with same properties but not referentially equal - scenario 1', function () {
            var input = { foo: 'bar', total: 123 };
            expect(objectsAndFunctions.cloneObject(input)).not.to.equal(input);
            expect(objectsAndFunctions.cloneObject(input)).to.deep.equal(input);
        });

        it('Should return an object with same properties but not referentially equal - scenario 2', function () {
            var input = { getTotal: function () { }, location: { x: 1, y: 2 } };
            expect(objectsAndFunctions.cloneObject(input)).not.to.equal(input);
            expect(objectsAndFunctions.cloneObject(input)).to.deep.equal(input);
        });
    });

    describe('Get object with given named functions that return given values', function () {

        describe('When given nothing', function () {
            it('It should return an empty object', function () {
                expect(objectsAndFunctions.getObjectWithGivenNamedFunctionsThatReturnGivenValues([])).to.deep.equal({});
            });
        });

        describe('When given a series of function names and return values', function () {
            let object, getObjectResult;

            beforeEach(function () {
                getObjectResult = {};
                object = objectsAndFunctions.getObjectWithGivenNamedFunctionsThatReturnGivenValues([
                    { functionName: 'getAge', returnValue: 18 },
                    { functionName: 'getGender', returnValue: 'Male' },
                    { functionName: 'getObject', returnValue: getObjectResult }
                ]);
            });

            it('It should return an object with the getAge function as expected', function () {
                expect(object.getAge()).to.equal(18);
            });

            it('It should return an object with the getGender function as expected', function () {
                expect(object.getGender()).to.equal('Male');
            });

            it('It should return an object with the getObject function as expected', function () {
                expect(object.getObject()).to.equal(getObjectResult);
            });
        });

        describe('When given a series of function names and value pairs', function () {
            let object;

            beforeEach(function () {
                object = objectsAndFunctions.getObjectWithGivenNamedFunctionsThatReturnAdditionOfGivenValues([
                    { functionName: 'getAge', value1: 18, value2: 12 },
                    { functionName: 'getGender', value1: 'Ma', value2: 'le' }
                ]);
            });

            it('It should return an object with the getAge function as expected', function () {
                expect(object.getAge()).to.equal(30);
            });

            it('It should return an object with the getGender function as expected', function () {
                expect(object.getGender()).to.equal('Male');
            });
        });

        describe('Basic Currying Addition', function () {
            let curriedFunction;

            describe('With an initial value of 2', function () {
                beforeEach(function () {
                    curriedFunction = objectsAndFunctions.curriedAdd(2);
                });

                it('It should return a function that returns the input plus 2', function () {
                    expect(curriedFunction(2)).to.equal(4);
                });
            });

            describe('With an initial value of -4', function () {
                beforeEach(function () {
                    curriedFunction = objectsAndFunctions.curriedAdd(-4);
                });

                it('It should return a function that returns the input minus 4', function () {
                    expect(curriedFunction(2)).to.equal(-2);
                });
            });

            describe('With an initial value of "Hello "', function () {
                beforeEach(function () {
                    curriedFunction = objectsAndFunctions.curriedAdd("Hello ");
                });

                it('It should return a function that returns the input prefixed by "Hello "', function () {
                    expect(curriedFunction("World!")).to.equal("Hello World!");
                });
            });
        });

        describe('Counter', function () {
            let counter;

            describe('When a start value is not provided', function () {
                beforeEach(function () {
                    counter = objectsAndFunctions.counter();
                });
                
                it('It should count as expected', function () {
                    expect(counter()).to.equal(1);
                    expect(counter()).to.equal(2);
                    expect(counter()).to.equal(3);
                    expect(counter()).to.equal(4);
                    expect(counter()).to.equal(5);
                });
            });

            describe('When a start value is provided', function () {
                beforeEach(function () {
                    counter = objectsAndFunctions.counter(5);
                });
                
                it('It should count as expected', function () {
                    expect(counter()).to.equal(5);
                    expect(counter()).to.equal(6);
                    expect(counter()).to.equal(7);
                    expect(counter()).to.equal(8);
                    expect(counter()).to.equal(9);
                });
            });
        });
    });
});