'use strict';

let expect = require('chai').expect;
let objectsAndFunctions = require('../lib/objects-functions');

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

});