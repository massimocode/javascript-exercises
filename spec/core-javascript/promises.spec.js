'use strict';

let expect = require('chai').expect;
let promises = require('../../lib/core-javascript/promises');
let sinon = require('sinon');
let zurvan = require('zurvan');
let utils = require('../../utils');

describe('Promises', function () {

    beforeEach(() => {
        return zurvan.interceptTimers().catch(() => { });
    });

    afterEach(() => {
        return zurvan.releaseTimers();
    });

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

        describe('Exercise 1 - Given a pending promise', () => {
            let promise, resolutionHandler, rejectionHandler, resolve, reject, returnValue;

            beforeEach(() => {
                promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                resolutionHandler = sinon.stub();
                rejectionHandler = sinon.stub();
                returnValue = promises.exercise1(promise, resolutionHandler, rejectionHandler);
            });

            it('It should not return anything', () => {
                expect(returnValue).to.been.undefined;
            });

            it('It should not call the resolution handler', () => {
                expect(resolutionHandler).to.not.have.been.called;
            });

            it('It should not call the rejection handler', () => {
                expect(rejectionHandler).to.not.have.been.called;
            });

            describe('When the promise is resolved', () => {
                let resolutionValue;

                beforeEach(() => {
                    resolutionValue = { foo: '123' };
                });

                describe('And the resolution handler executes without any error and does not return a rejected promise', () => {
                    beforeEach(() => {
                        resolve(resolutionValue);
                        return zurvan.waitForEmptyQueue();
                    });

                    it('It should call the resolution handler with the resolution value', () => {
                        expect(resolutionHandler).to.have.been.calledWithExactly(resolutionValue);
                    });

                    it('It should not call the rejection handler', () => {
                        expect(rejectionHandler).to.not.have.been.called;
                    });
                });

                describe('And the resolution handler executes and throws an error', () => {
                    beforeEach(() => {
                        resolutionHandler.throws();
                        resolve(resolutionValue);
                        return zurvan.waitForEmptyQueue();
                    });

                    it('It should call the resolution handler with the resolution value', () => {
                        expect(resolutionHandler).to.have.been.calledWithExactly(resolutionValue);
                    });

                    it('It should not call the rejection handler', () => {
                        expect(rejectionHandler).to.not.have.been.called;
                    });
                });
            });

            describe('When the promise is rejected', () => {
                let rejectionValue;

                beforeEach(() => {
                    rejectionValue = new Error('Some error');
                    reject(rejectionValue);
                    return zurvan.waitForEmptyQueue();
                });

                it('It should call the rejection handler with the rejection value', () => {
                    expect(rejectionHandler).to.have.been.calledWithExactly(rejectionValue);
                });

                it('It should not call the resolution handler', () => {
                    expect(resolutionHandler).to.not.have.been.called;
                });
            });
        });

        describe('Exercise 2 - Given a pending promise', () => {
            let promise, resolutionHandler, rejectionHandler, resolve, reject, returnValue;

            beforeEach(() => {
                promise = new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                resolutionHandler = sinon.stub();
                rejectionHandler = sinon.stub();
                returnValue = promises.exercise2(promise, resolutionHandler, rejectionHandler);
            });

            it('It should not return anything', () => {
                expect(returnValue).to.been.undefined;
            });

            it('It should not call the resolution handler', () => {
                expect(resolutionHandler).to.not.have.been.called;
            });

            it('It should not call the rejection handler', () => {
                expect(rejectionHandler).to.not.have.been.called;
            });

            describe('When the promise is resolved', () => {
                let resolutionValue;

                beforeEach(() => {
                    resolutionValue = { foo: '123' };
                });

                describe('And the resolution handler executes without any error and does not return a rejected promise', () => {
                    beforeEach(() => {
                        resolve(resolutionValue);
                        return zurvan.waitForEmptyQueue();
                    });

                    it('It should call the resolution handler with the resolution value', () => {
                        expect(resolutionHandler).to.have.been.calledWithExactly(resolutionValue);
                    });

                    it('It should not call the rejection handler', () => {
                        expect(rejectionHandler).to.not.have.been.called;
                    });
                });

                describe('And the resolution handler executes and throws an error', () => {
                    let errorThrown;

                    beforeEach(() => {
                        errorThrown = new Error('Some error during execution of the resolution handler');
                        resolutionHandler.throws(errorThrown);
                        resolve(resolutionValue);
                        return zurvan.waitForEmptyQueue();
                    });

                    it('It should call the resolution handler with the resolution value', () => {
                        expect(resolutionHandler).to.have.been.calledWithExactly(resolutionValue);
                    });

                    it('It should call the rejection handler with the error that was thrown by the resolution handler', () => {
                        expect(rejectionHandler).to.have.been.calledWithExactly(errorThrown);
                    });
                });

                describe('And the resolution handler executes and returns a rejected promise', () => {
                    let rejectionValue;

                    beforeEach(() => {
                        rejectionValue = { bar: '456' };
                        resolutionHandler.returns(Promise.reject(rejectionValue));
                        resolve(resolutionValue);
                        return zurvan.waitForEmptyQueue();
                    });

                    it('It should call the resolution handler with the resolution value', () => {
                        expect(resolutionHandler).to.have.been.calledWithExactly(resolutionValue);
                    });

                    it('It should call the rejection handler with the rejection value of the rejected promise that was returned by the resolution handler', () => {
                        expect(rejectionHandler).to.have.been.calledWithExactly(rejectionValue);
                    });
                });
            });

            describe('When the promise is rejected', () => {
                let rejectionValue;

                beforeEach(() => {
                    rejectionValue = new Error('Some error');
                    reject(rejectionValue);
                    return zurvan.waitForEmptyQueue();
                });

                it('It should call the rejection handler with the rejection value', () => {
                    expect(rejectionHandler).to.have.been.calledWithExactly(rejectionValue);
                });

                it('It should not call the resolution handler', () => {
                    expect(resolutionHandler).to.not.have.been.called;
                });
            });
        });
    });
});