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

    describe('Exercise 1 - When the user registers a user', function () {
        let registerUser, usersCallback;

        beforeEach(() => {
            registerUser = sinon.spy(callback => {
                usersCallback = callback;
            });
            callbacks.exercise1(registerUser);
        });

        it('The user should have registered a user', () => {
            expect(registerUser).to.have.been.calledWithExactly(usersCallback);
        });

        it('The user should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        describe('When the user has been registered', () => {
            beforeEach(() => {
                usersCallback();
            });

            it('The user should log a notificationa to the console', () => {
                expect(console.log).to.have.been.calledWithExactly('USER REGISTERED');
            });
        });
    });

    describe('Exercise 2 - When the user places an order', function () {
        let placeOrder, usersCallback;

        beforeEach(() => {
            placeOrder = sinon.spy(callback => {
                usersCallback = callback;
            });
            callbacks.exercise2(placeOrder);
        });

        it('The user should have placed an order', () => {
            expect(placeOrder).to.have.been.calledWithExactly(usersCallback);
        });

        it('The user should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        describe('When the data has been retrieved successfully', () => {
            let orderReferenceNumber;

            beforeEach(() => {
                orderReferenceNumber = 'Order Reference Number 12345';
                usersCallback(orderReferenceNumber);
            });

            it('The user should log the data to the console', () => {
                expect(console.log).to.have.been.calledWithExactly(orderReferenceNumber);
            });
        });
    });

    describe('Exercise 3 - When the user requests data', function () {
        let getData, usersCallback;

        beforeEach(() => {
            getData = sinon.spy((url, callback) => {
                usersCallback = callback;
            });
            callbacks.exercise3(getData);
        });

        it('The user should have requested data from "someUrl"', () => {
            expect(getData).to.have.been.calledWithExactly('someUrl', usersCallback);
        });

        it('The user should not log anything to the console', () => {
            expect(console.log).to.not.have.been.called;
        });

        it('The user should not report any errors to the console', () => {
            expect(console.error).to.not.have.been.called;
        });

        describe('When the data has been retrieved successfully', () => {
            let data;

            beforeEach(() => {
                data = { foo: 'bar' };
                usersCallback(null, data);
            });

            it('The user should log the data to the console', () => {
                expect(console.log).to.have.been.calledWithExactly(data);
            });

            it('The user should not report any errors to the console', () => {
                expect(console.error).to.not.have.been.called;
            });
        });

        describe('When there was an error retrieving the data', () => {
            let error;

            beforeEach(() => {
                error = new Error('Could not retrieve data');
                usersCallback(error);
            });

            it('The user should not log anything to the console', () => {
                expect(console.log).to.not.have.been.called;
            });

            it('The user should report the error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(error);
            });
        });
    });
});