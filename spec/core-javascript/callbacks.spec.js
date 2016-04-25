'use strict';

let expect = require('chai').expect;
let callbacks = require('../../lib/core-javascript/callbacks');
let sinon = require('sinon');

describe('Callbacks', function () {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Exercise 1 - When registering a user', function () {
        let registerUser, usersCallback;

        beforeEach(() => {
            registerUser = sinon.spy(callback => {
                usersCallback = callback;
            });
            callbacks.exercise1(registerUser);
        });

        it('It should have registered a user', () => {
            expect(registerUser).to.have.been.calledWithExactly(usersCallback);
        });

        it('It should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        describe('When the user has been registered', () => {
            beforeEach(() => {
                usersCallback();
            });

            it('It should log a notification to the console', () => {
                expect(console.log).to.have.been.calledWithExactly('USER REGISTERED');
            });
        });
    });

    describe('Exercise 2 - When placing an order', function () {
        let placeOrder, usersCallback;

        beforeEach(() => {
            placeOrder = sinon.spy(callback => {
                usersCallback = callback;
            });
            callbacks.exercise2(placeOrder);
        });

        it('It should have placed an order', () => {
            expect(placeOrder).to.have.been.calledWithExactly(usersCallback);
        });

        it('It should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        describe('When the order has been placed successfully', () => {
            let orderReferenceNumber;

            beforeEach(() => {
                orderReferenceNumber = 'Order Reference Number 12345';
                usersCallback(orderReferenceNumber);
            });

            it('It should log the order reference number to the console', () => {
                expect(console.log).to.have.been.calledWithExactly(orderReferenceNumber);
            });
        });
    });

    describe('Exercise 3 - When requesting data', function () {
        let getData, usersCallback;

        beforeEach(() => {
            getData = sinon.spy((url, callback) => {
                usersCallback = callback;
            });
            callbacks.exercise3(getData);
        });

        it('It should have requested data from "someUrl"', () => {
            expect(getData).to.have.been.calledWithExactly('someUrl', usersCallback);
        });

        it('It should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        it('It should not report any errors to the console', () => {
            expect(console.error).to.not.have.been.called;
        });

        describe('When the data has been retrieved successfully', () => {
            let data;

            beforeEach(() => {
                data = { foo: 'bar' };
                usersCallback(null, data);
            });

            it('It should log the data to the console', () => {
                expect(console.log).to.have.been.calledWithExactly(data);
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).to.not.have.been.called;
            });
        });

        describe('When there was an error retrieving the data', () => {
            let error;

            beforeEach(() => {
                error = new Error('Could not retrieve data');
                usersCallback(error);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            it('It should report the error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(error);
            });
        });
    });

    describe('Exercise 4 - When requesting data', function () {
        let getData, usersCallback;

        describe('And a synchronous error is not thrown', () => {

            beforeEach(() => {
                getData = sinon.spy((url, callback) => {
                    usersCallback = callback;
                });
                callbacks.exercise4(getData);
            });

            it('It should have requested data from "someUrl"', () => {
                expect(getData).to.have.been.calledWithExactly('someUrl', usersCallback);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).to.not.have.been.called;
            });

            describe('When the data has been retrieved successfully', () => {
                let data;

                beforeEach(() => {
                    data = { foo: 'bar' };
                    usersCallback(null, data);
                });

                it('It should log the data to the console', () => {
                    expect(console.log).to.have.been.calledWithExactly(data);
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).to.not.have.been.called;
                });
            });

            describe('When there was an error retrieving the data', () => {
                let error;

                beforeEach(() => {
                    error = new Error('Could not retrieve data');
                    usersCallback(error);
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).to.not.have.been.called;
                });

                it('It should report the error to the console', () => {
                    expect(console.error).to.have.been.calledWithExactly(error);
                });
            });

        });

        describe('And a synchronous error is thrown', () => {
            let error;

            beforeEach(() => {
                error = new Error('A synchronous error');
                getData = sinon.spy((url, callback) => {
                    usersCallback = callback;
                    throw error;
                });
                callbacks.exercise4(getData);
            });

            it('It should have requested data from "someUrl"', () => {
                expect(getData).to.have.been.calledWithExactly('someUrl', usersCallback);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            it('It should report the synchronous error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(error);
            });
        });
    });

    describe('Exercise 5 - When requesting data', function () {
        let getData, usersCallback;

        describe('And a synchronous error is not thrown', () => {

            beforeEach(() => {
                getData = sinon.spy((url, callback) => {
                    usersCallback = callback;
                });
                callbacks.exercise5(getData);
            });

            it('It should have requested data from "someUrl"', () => {
                expect(getData).to.have.been.calledWithExactly('someUrl', usersCallback);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).to.not.have.been.called;
            });

            describe('When the data has been retrieved successfully', () => {
                let data;

                beforeEach(() => {
                    data = { foo: 'bar' };
                    usersCallback(null, data);
                });

                it('It should log the data to the console', () => {
                    expect(console.log).to.have.been.calledWithExactly(data);
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).to.not.have.been.called;
                });

                describe('When calling the callback with an error after it has already been called', () => {
                    beforeEach(() => {
                        console.log.reset();
                        console.error.reset();
                        usersCallback(new Error());
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).to.not.have.been.called;
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).to.not.have.been.called;
                    });
                });

                describe('When calling the callback with data after it has already been called', () => {
                    beforeEach(() => {
                        console.log.reset();
                        console.error.reset();
                        usersCallback(null, data);
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).to.not.have.been.called;
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).to.not.have.been.called;
                    });
                });
            });

            describe('When there was an error retrieving the data', () => {
                let error;

                beforeEach(() => {
                    error = new Error('Could not retrieve data');
                    usersCallback(error);
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).to.not.have.been.called;
                });

                it('It should report the error to the console', () => {
                    expect(console.error).to.have.been.calledWithExactly(error);
                });

                describe('When calling the callback with an error after it has already been called', () => {
                    beforeEach(() => {
                        console.log.reset();
                        console.error.reset();
                        usersCallback(error);
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).to.not.have.been.called;
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).to.not.have.been.called;
                    });
                });

                describe('When calling the callback with data after it has already been called', () => {
                    beforeEach(() => {
                        console.log.reset();
                        console.error.reset();
                        usersCallback(null, { foo: 'bar' });
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).to.not.have.been.called;
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).to.not.have.been.called;
                    });
                });
            });
        });

        describe('And a synchronous error is thrown', () => {
            let error;

            beforeEach(() => {
                error = new Error('A synchronous error');
                getData = sinon.spy((url, callback) => {
                    usersCallback = callback;
                    throw error;
                });
                callbacks.exercise5(getData);
            });

            it('It should have requested data from "someUrl"', () => {
                expect(getData).to.have.been.calledWithExactly('someUrl', usersCallback);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            it('It should report the synchronous error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(error);
            });
        });
    });

    describe('Exercise 6 - When placing an order and registering a user', function () {
        let placeOrder, registerUser, placeOrderCallback, registerUserCallback;

        beforeEach(() => {
            placeOrder = sinon.spy(callback => {
                placeOrderCallback = callback;
            });
            registerUser = sinon.spy(callback => {
                registerUserCallback = callback;
            });
            callbacks.exercise6(placeOrder, registerUser);
        });

        it('It should have placed an order', () => {
            expect(placeOrder).to.have.been.calledWithExactly(placeOrderCallback);
        });

        it('It should have registered a new user', () => {
            expect(registerUser).to.have.been.calledWithExactly(registerUserCallback);
        });

        it('It should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        describe('When the order has been placed successfully', () => {
            let orderReferenceNumber;

            beforeEach(() => {
                orderReferenceNumber = 'Order Reference Number 12345';
                placeOrderCallback(orderReferenceNumber);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            describe('When the user has been registered successfully', () => {
                let userId;

                beforeEach(() => {
                    userId = 'User ID 12231221';
                    registerUserCallback(userId);
                });

                it('It should output the message to the console', () => {
                    expect(console.log).to.have.been.calledWithExactly(`User ${userId} placed order ${orderReferenceNumber}`);
                });
            });
        });

        describe('When the user has been registered successfully', () => {
            let userId;

            beforeEach(() => {
                userId = 'User ID 12231221';
                registerUserCallback(userId);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            describe('When the order has been placed successfully', () => {
                let orderReferenceNumber;

                beforeEach(() => {
                    orderReferenceNumber = 'Order Reference Number 12345';
                    placeOrderCallback(orderReferenceNumber);
                });

                it('It should output the message to the console', () => {
                    expect(console.log).to.have.been.calledWithExactly(`User ${userId} placed order ${orderReferenceNumber}`);
                });
            });
        });
    });
});