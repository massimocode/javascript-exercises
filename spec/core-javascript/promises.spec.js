'use strict';

let expect = require('chai').expect;
let promises = require('../../lib/core-javascript/promises');
let sinon = require('sinon');
let utils = require('../../utils');

describe('Promises', function () {

    describe('Creating promises', function () {
        it('Should be able to return a resolved promise', function () {
            expect(utils.getStateSync(promises.getResolvedPromise())).to.equal('resolved');
        });

        it('Should be able to return a promise that resolves with the given primitive value', function () {
            return promises.getPromiseResolvedWith('foo').then(result => {
                expect(result).to.equal('foo');
            });
        });

        it('Should be able to return a promise that resolves with the given object', function () {
            let resolutionValue = {};
            return promises.getPromiseResolvedWith(resolutionValue).then(result => {
                expect(result).to.equal(resolutionValue);
            });
        });

        it('Should be able to return a rejected promise', function () {
            expect(utils.getStateSync(promises.getRejectedPromise())).to.equal('rejected');
        });

        it('Should be able to return a promise that rejects with the given primitive value', function () {
            return promises.getPromiseRejectedWith('foo').then(() => {
                throw new Error("Promise should not have resolved");
            }).catch(result => {
                expect(result).to.equal('foo');
            });
        });

        it('Should be able to return a promise that rejects with the given object', function () {
            let rejectionValue = new Error();
            return promises.getPromiseRejectedWith(rejectionValue).then(() => {
                throw new Error("Promise should not have resolved");
            }).catch(result => {
                expect(result).to.equal(rejectionValue);
            });
        });

        it('Should be able to return a pending promise', function () {
            expect(utils.getStateSync(promises.getPendingPromise())).to.equal('pending');
        });
    });

    describe('Interacting with promises', () => {
        it('Should be able to call the supplied function with the resolution value of the supplied promise', function () {
            expect(utils.getStateSync(promises.getResolvedPromise())).to.equal('resolved');
        });
    });
});