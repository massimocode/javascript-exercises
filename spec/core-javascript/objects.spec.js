'use strict';

let expect = require('chai').expect;
let objects = require('../../lib/core-javascript/objects');

describe('Objects', function () {

    describe('Get empty object', function () {
        it('Should return an empty object', function () {
            expect(objects.getEmptyObject()).to.deep.equal({});
        });
    });

    describe('Get object with total property', function () {

        it('Should return an object with a "total" property set to 123', function () {
            expect(objects.getObjectWithTotalProperty(123)).to.deep.equal({ total: 123 });
        });

        it('Should return an object with a "total" property set to 987', function () {
            expect(objects.getObjectWithTotalProperty(987)).to.deep.equal({ total: 987 });
        });
    });

    describe('Get object with named property that is set to the given value', function () {

        it('Given "playback" and 123, should return an object with a playback property that is set to 123', function () {
            var result = objects.getObjectWithGivenNamedPropertySetToGivenValue("playback", 123);
            expect(result.playback).to.equal(123);
        });

        it('Given "playback" and abc", should return an object with a playback property that is set to "abc"', function () {
            var result = objects.getObjectWithGivenNamedPropertySetToGivenValue("playback", "abc");
            expect(result.playback).to.equal("abc");
        });

        it('Given "playback" and an object, should return an object with a playback property that is set to the given object', function () {
            var objectToReturn = {};
            var result = objects.getObjectWithGivenNamedPropertySetToGivenValue("playback", objectToReturn);
            expect(result.playback).to.equal(objectToReturn);
        });

        it('Given "some other name" and 123, should return an object with a "some other name" property that is set to 123', function () {
            var result = objects.getObjectWithGivenNamedPropertySetToGivenValue("some other name", 123);
            expect(result["some other name"]).to.equal(123);
        });

        it('Given "some other name" and abc", should return an object with a "some other name" property that is set to "abc"', function () {
            var result = objects.getObjectWithGivenNamedPropertySetToGivenValue("some other name", "abc");
            expect(result["some other name"]).to.equal("abc");
        });

        it('Given "some other name" and an object, should return an object with a "some other name" property that is set to the given object', function () {
            var objectToReturn = {};
            var result = objects.getObjectWithGivenNamedPropertySetToGivenValue("some other name", objectToReturn);
            expect(result["some other name"]).to.equal(objectToReturn);
        });
    });

    describe('Clone object', function () {

        it('Should return an object with same properties but not referentially equal - scenario 1', function () {
            var input = { foo: 'bar', total: 123 };
            expect(objects.cloneObject(input)).not.to.equal(input);
            expect(objects.cloneObject(input)).to.deep.equal(input);
        });

        it('Should return an object with same properties but not referentially equal - scenario 2', function () {
            var input = { getTotal: function () { }, location: { x: 1, y: 2 } };
            expect(objects.cloneObject(input)).not.to.equal(input);
            expect(objects.cloneObject(input)).to.deep.equal(input);
        });
    });
});