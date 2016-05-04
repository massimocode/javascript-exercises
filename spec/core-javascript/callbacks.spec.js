'use strict';

let expect = require('chai').expect;
let callbacks = require('../../lib/core-javascript/callbacks');
let sinon = require('sinon');
let zurvan = require('zurvan');

describe('Callbacks', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
        return zurvan.interceptTimers().catch(() => { });
    });

    afterEach(() => {
        sandbox.restore();
        return zurvan.releaseTimers();
    });

    describe('Exercise 1 - When registering a user', () => {
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

    describe('Exercise 2 - When placing an order', () => {
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

    describe('Exercise 3 - When requesting data', () => {
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

    describe('Exercise 4 - When requesting data', () => {
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

    describe('Exercise 5 - When requesting data', () => {
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

    describe('Exercise 6 - When placing an order and registering a user', () => {
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

    describe('Exercise 7 - When inserting data into the database', () => {
        let connect, connectCallback;

        beforeEach(() => {
            connect = sinon.spy((serverAddress, callback) => {
                connectCallback = callback;
            });
            callbacks.exercise7(connect);
        });

        it('It should connect to the database', () => {
            expect(connect).to.have.been.calledWithExactly('mongodb://mongo-server.foo.com:44017', connectCallback);
        });

        describe('When there was an error connecting to the database server', () => {
            let errorConnecting;

            beforeEach(() => {
                errorConnecting = new Error('Server not found');
                connectCallback(errorConnecting);
            });

            it('It should report the error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(errorConnecting);
            });

            it('It should not log anything to the console', () => {
                expect(console.log).not.to.have.been.called;
            });
        });

        describe('When the connection to the database server was established successfully', () => {
            let connection, openDatabaseCallback;

            beforeEach(() => {
                connection = {
                    openDatabase: sinon.spy((databaseName, callback) => {
                        openDatabaseCallback = callback;
                    })
                };
                connectCallback(null, connection);
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).not.to.have.been.called;
            });

            it('It should not log anything to the console', () => {
                expect(console.log).not.to.have.been.called;
            });

            it('It should open the database', () => {
                expect(connection.openDatabase).to.have.been.calledWithExactly('Master', openDatabaseCallback);
            });

            describe('When there was an error opening the database', () => {
                let errorOpeningDatabase;

                beforeEach(() => {
                    errorOpeningDatabase = new Error('Database does not exist');
                    openDatabaseCallback(errorOpeningDatabase);
                });

                it('It should report the error to the console', () => {
                    expect(console.error).to.have.been.calledWithExactly(errorOpeningDatabase);
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).not.to.have.been.called;
                });
            });

            describe('When the database was opened successfully', () => {
                let database, insertRecordCallback;

                beforeEach(() => {
                    database = {
                        insertRecord: sinon.spy((collectionName, record, callback) => {
                            insertRecordCallback = callback;
                        })
                    };
                    openDatabaseCallback(null, database);
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).not.to.have.been.called;
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).not.to.have.been.called;
                });

                it('It should insert the record as expected', () => {
                    expect(database.insertRecord).to.have.been.calledWithExactly('status', { status: `I'm ready!` }, insertRecordCallback);
                });

                describe('When there was an error inserting the record', () => {
                    let errorInsertingRecord;

                    beforeEach(() => {
                        errorInsertingRecord = new Error('Connection timeout');
                        insertRecordCallback(errorInsertingRecord);
                    });

                    it('It should report the error to the console', () => {
                        expect(console.error).to.have.been.calledWithExactly(errorInsertingRecord);
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).not.to.have.been.called;
                    });
                });

                describe('When the record was inserted successfully', () => {
                    let recordId;

                    beforeEach(() => {
                        recordId = 'some_record_id';
                        insertRecordCallback(null, recordId);
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).not.to.have.been.called;
                    });

                    it('It should log the record ID to the console', () => {
                        expect(console.log).to.have.been.calledWithExactly(recordId);
                    });
                });
            });
        });
    });

    describe('Exercise 8 - When running the restocking job', () => {
        let connect, connectCallback;

        beforeEach(() => {
            connect = sinon.spy((serverAddress, callback) => {
                connectCallback = callback;
            });
            callbacks.exercise8(connect);
        });

        it('It should connect to the database', () => {
            expect(connect).to.have.been.calledWithExactly('mongodb://mongo-server.foo.com:44017', connectCallback);
        });

        describe('When there was an error connecting to the database server', () => {
            let errorConnecting;

            beforeEach(() => {
                errorConnecting = new Error('Server not found');
                connectCallback(errorConnecting);
            });

            it('It should report the error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(errorConnecting);
            });

            it('It should log the failure message to the console', () => {
                expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
            });

            it('It should only log one message to the console', () => {
                expect(console.log).to.have.been.calledOnce;
            });
        });

        describe('When the connection to the database server was established successfully', () => {
            let connection, openDatabaseCallback;

            beforeEach(() => {
                connection = {
                    openDatabase: sinon.spy((databaseName, callback) => {
                        openDatabaseCallback = callback;
                    })
                };
                connectCallback(null, connection);
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).not.to.have.been.called;
            });

            it('It should not log anything to the console', () => {
                expect(console.log).not.to.have.been.called;
            });

            it('It should open the Shop database', () => {
                expect(connection.openDatabase).to.have.been.calledWithExactly('Shop', openDatabaseCallback);
            });

            describe('When there was an error opening the database', () => {
                let errorOpeningDatabase;

                beforeEach(() => {
                    errorOpeningDatabase = new Error('Database does not exist');
                    openDatabaseCallback(errorOpeningDatabase);
                });

                it('It should report the error to the console', () => {
                    expect(console.error).to.have.been.calledWithExactly(errorOpeningDatabase);
                });

                it('It should log the failure message to the console', () => {
                    expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                });

                it('It should only log one message to the console', () => {
                    expect(console.log).to.have.been.calledOnce;
                });
            });

            describe('When the database was opened successfully', () => {
                let database, insertRecordCallbacks, queryCallback;

                beforeEach(() => {
                    insertRecordCallbacks = {};
                    database = {
                        insertRecord: sinon.spy((collectionName, record, callback) => {
                            insertRecordCallbacks[record.productName] = callback;
                        }),
                        query: sinon.spy((collectionName, callback) => {
                            queryCallback = callback;
                        })
                    };
                    openDatabaseCallback(null, database);
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).not.to.have.been.called;
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).not.to.have.been.called;
                });

                it('It should query the products collection as expected', () => {
                    expect(database.query).to.have.been.calledWithExactly('products', queryCallback);
                });

                it('It should not insert any records', () => {
                    expect(database.insertRecord).not.to.have.been.called;
                });

                describe('When there was an error querying the collection', () => {
                    let errorQueryingCollection;

                    beforeEach(() => {
                        errorQueryingCollection = new Error('Collection does not exist');
                        queryCallback(errorQueryingCollection);
                    });

                    it('It should report the error to the console', () => {
                        expect(console.error).to.have.been.calledWithExactly(errorQueryingCollection);
                    });

                    it('It should log the failure message to the console', () => {
                        expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                    });

                    it('It should only log one message to the console', () => {
                        expect(console.log).to.have.been.calledOnce;
                    });

                    it('It should not insert any records', () => {
                        expect(database.insertRecord).not.to.have.been.called;
                    });
                });

                describe('When the collection was queried successfully and 3 of 5 products needed restocking', () => {
                    let records;

                    beforeEach(() => {
                        records = [
                            { name: 'Cola', stockLevel: 1 },
                            { name: 'Fizzy Foo', stockLevel: 0 },
                            { name: 'Berry Splat', stockLevel: 5 },
                            { name: 'Sweet Shizzle', stockLevel: 2 },
                            { name: 'Tropicrazy', stockLevel: 7 }
                        ];
                        queryCallback(null, records);
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).not.to.have.been.called;
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).not.to.have.been.called;
                    });

                    it('It should insert a restocking record for Cola', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Cola' }, insertRecordCallbacks['Cola']);
                    });

                    it('It should insert a restocking record for Fizzy Foo', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Fizzy Foo' }, insertRecordCallbacks['Fizzy Foo']);
                    });

                    it('It should insert a restocking record for Sweet Shizzle', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Sweet Shizzle' }, insertRecordCallbacks['Sweet Shizzle']);
                    });

                    describe('When there was an error inserting the restocking record for Cola, but the restocking record for Fizzy Foo and Sweet Shizzle were successfully inserted', () => {
                        let errorInsertingRecord;

                        beforeEach(() => {
                            errorInsertingRecord = new Error('Connection error');
                            insertRecordCallbacks['Cola'](errorInsertingRecord);
                            insertRecordCallbacks['Fizzy Foo'](null, 1);
                            insertRecordCallbacks['Sweet Shizzle'](null, 2);
                        });

                        it('It should report the error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingRecord);
                        });

                        it('It should report only 1 error to the console', () => {
                            expect(console.error).to.have.been.calledOnce;
                        });

                        it('It should log the failure message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });

                    describe('When there was an error inserting the restocking record for Fizzy Foo, but the restocking record for Cola and Sweet Shizzle were successfully inserted', () => {
                        let errorInsertingRecord;

                        beforeEach(() => {
                            insertRecordCallbacks['Cola'](null, 1);
                            errorInsertingRecord = new Error('Connection error');
                            insertRecordCallbacks['Fizzy Foo'](errorInsertingRecord);
                            insertRecordCallbacks['Sweet Shizzle'](null, 2);
                        });

                        it('It should report the error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingRecord);
                        });

                        it('It should report only 1 error to the console', () => {
                            expect(console.error).to.have.been.calledOnce;
                        });

                        it('It should log the failure message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });

                    describe('When there were errors inserting the restocking records for Fizzy Foo and Sweet Shizzle, but the restocking record for Cola was successfully inserted', () => {
                        let errorInsertingFizzyFooRecord, errorInsertingSweetShizzleRecord;

                        beforeEach(() => {
                            insertRecordCallbacks['Cola'](null, 1);

                            errorInsertingFizzyFooRecord = new Error('Connection error');
                            insertRecordCallbacks['Fizzy Foo'](errorInsertingFizzyFooRecord);

                            errorInsertingSweetShizzleRecord = new Error('Some other error');
                            insertRecordCallbacks['Sweet Shizzle'](errorInsertingSweetShizzleRecord);
                        });

                        it('It should report the Fizzy Foo error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingFizzyFooRecord);
                        });

                        it('It should report the Sweet Shizzle error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingSweetShizzleRecord);
                        });

                        it('It should report 2 errors to the console', () => {
                            expect(console.error).to.have.been.calledTwice;
                        });

                        it('It should log the failure message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });

                    describe('When all restocking records were inserted successfully', () => {
                        beforeEach(() => {
                            insertRecordCallbacks['Cola'](null, 1);
                            insertRecordCallbacks['Fizzy Foo'](null, 2);
                            insertRecordCallbacks['Sweet Shizzle'](null, 3);
                        });

                        it('It should not report any errors to the console', () => {
                            expect(console.error).to.not.have.been.called;
                        });

                        it('It should log the success message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB SUCCESSFUL');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });
                });

                describe('When the collection was queried successfully and no products needed restocking', () => {
                    let records;

                    beforeEach(() => {
                        records = [
                            { name: 'Cola', stockLevel: 8 },
                            { name: 'Fizzy Foo', stockLevel: 4 },
                            { name: 'Berry Splat', stockLevel: 5 },
                            { name: 'Sweet Shizzle', stockLevel: 6 },
                            { name: 'Tropicrazy', stockLevel: 7 }
                        ];
                        queryCallback(null, records);
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).not.to.have.been.called;
                    });

                    it('It should not insert any restocking records', () => {
                        expect(database.insertRecord).to.not.have.been.called;
                    });

                    it('It should log the success message to the console', () => {
                        expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB SUCCESSFUL');
                    });

                    it('It should only log one message to the console', () => {
                        expect(console.log).to.have.been.calledOnce;
                    });
                });
            });
        });
    });

    describe('Exercise 9 - When running the restocking job', () => {
        let connect, connectCallback;

        beforeEach(() => {
            connect = sinon.spy((serverAddress, callback) => {
                connectCallback = callback;
            });
            callbacks.exercise9(connect);
        });

        it('It should connect to the database', () => {
            expect(connect).to.have.been.calledWithExactly('mongodb://mongo-server.foo.com:44017', connectCallback);
        });

        describe('When there was an error connecting to the database server', () => {
            let errorConnecting;

            beforeEach(() => {
                errorConnecting = new Error('Server not found');
                connectCallback(errorConnecting);
            });

            it('It should report the error to the console', () => {
                expect(console.error).to.have.been.calledWithExactly(errorConnecting);
            });

            it('It should log the failure message to the console', () => {
                expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
            });

            it('It should only log one message to the console', () => {
                expect(console.log).to.have.been.calledOnce;
            });
        });

        describe('When the connection to the database server was established successfully', () => {
            let connection, openDatabaseCallback;

            beforeEach(() => {
                connection = {
                    openDatabase: sinon.spy((databaseName, callback) => {
                        openDatabaseCallback = callback;
                    })
                };
                connectCallback(null, connection);
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).not.to.have.been.called;
            });

            it('It should not log anything to the console', () => {
                expect(console.log).not.to.have.been.called;
            });

            it('It should open the Shop database', () => {
                expect(connection.openDatabase).to.have.been.calledWithExactly('Shop', openDatabaseCallback);
            });

            describe('When there was an error opening the database', () => {
                let errorOpeningDatabase;

                beforeEach(() => {
                    errorOpeningDatabase = new Error('Database does not exist');
                    openDatabaseCallback(errorOpeningDatabase);
                });

                it('It should report the error to the console', () => {
                    expect(console.error).to.have.been.calledWithExactly(errorOpeningDatabase);
                });

                it('It should log the failure message to the console', () => {
                    expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                });

                it('It should only log one message to the console', () => {
                    expect(console.log).to.have.been.calledOnce;
                });
            });

            describe('When the database was opened successfully', () => {
                let database, insertRecordCallbacks, queryCallback;

                beforeEach(() => {
                    insertRecordCallbacks = {};
                    database = {
                        insertRecord: sinon.spy((collectionName, record, callback) => {
                            insertRecordCallbacks[record.productName] = callback;
                        }),
                        query: sinon.spy((collectionName, callback) => {
                            queryCallback = callback;
                        })
                    };
                    openDatabaseCallback(null, database);
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).not.to.have.been.called;
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).not.to.have.been.called;
                });

                it('It should query the products collection as expected', () => {
                    expect(database.query).to.have.been.calledWithExactly('products', queryCallback);
                });

                it('It should not insert any records', () => {
                    expect(database.insertRecord).not.to.have.been.called;
                });

                describe('When there was an error querying the collection', () => {
                    let errorQueryingCollection;

                    beforeEach(() => {
                        errorQueryingCollection = new Error('Collection does not exist');
                        queryCallback(errorQueryingCollection);
                    });

                    it('It should report the error to the console', () => {
                        expect(console.error).to.have.been.calledWithExactly(errorQueryingCollection);
                    });

                    it('It should log the failure message to the console', () => {
                        expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                    });

                    it('It should only log one message to the console', () => {
                        expect(console.log).to.have.been.calledOnce;
                    });

                    it('It should not insert any records', () => {
                        expect(database.insertRecord).not.to.have.been.called;
                    });
                });

                describe('When the collection was queried successfully and 3 of 5 products needed restocking', () => {
                    let records;

                    beforeEach(() => {
                        records = [
                            { name: 'Cola', stockLevel: 1 },
                            { name: 'Fizzy Foo', stockLevel: 0 },
                            { name: 'Berry Splat', stockLevel: 5 },
                            { name: 'Sweet Shizzle', stockLevel: 2 },
                            { name: 'Tropicrazy', stockLevel: 7 }
                        ];
                        queryCallback(null, records);
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).not.to.have.been.called;
                    });

                    it('It should not log anything to the console', () => {
                        expect(console.log).not.to.have.been.called;
                    });

                    it('It should insert a restocking record for Cola', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Cola' }, insertRecordCallbacks['Cola']);
                    });

                    it('It should insert a restocking record for Fizzy Foo', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Fizzy Foo' }, insertRecordCallbacks['Fizzy Foo']);
                    });

                    it('It should insert a restocking record for Sweet Shizzle', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Sweet Shizzle' }, insertRecordCallbacks['Sweet Shizzle']);
                    });

                    describe('When there was an error inserting the restocking record for Cola, but the restocking record for Fizzy Foo and Sweet Shizzle were successfully inserted', () => {
                        let errorInsertingRecord;

                        beforeEach(() => {
                            errorInsertingRecord = new Error('Connection error');
                            insertRecordCallbacks['Cola'](errorInsertingRecord);
                            insertRecordCallbacks['Fizzy Foo'](null, 1);
                            insertRecordCallbacks['Sweet Shizzle'](null, 2);
                        });

                        it('It should report the error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingRecord);
                        });

                        it('It should report only 1 error to the console', () => {
                            expect(console.error).to.have.been.calledOnce;
                        });

                        it('It should log the failure message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });

                    describe('When there was an error inserting the restocking record for Fizzy Foo, but the restocking record for Cola and Sweet Shizzle were successfully inserted', () => {
                        let errorInsertingRecord;

                        beforeEach(() => {
                            insertRecordCallbacks['Cola'](null, 1);
                            errorInsertingRecord = new Error('Connection error');
                            insertRecordCallbacks['Fizzy Foo'](errorInsertingRecord);
                            insertRecordCallbacks['Sweet Shizzle'](null, 2);
                        });

                        it('It should report the error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingRecord);
                        });

                        it('It should report only 1 error to the console', () => {
                            expect(console.error).to.have.been.calledOnce;
                        });

                        it('It should log the failure message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });

                    describe('When there were errors inserting the restocking records for Fizzy Foo and Sweet Shizzle, but the restocking record for Cola was successfully inserted', () => {
                        let errorInsertingFizzyFooRecord, errorInsertingSweetShizzleRecord;

                        beforeEach(() => {
                            insertRecordCallbacks['Cola'](null, 1);

                            errorInsertingFizzyFooRecord = new Error('Connection error');
                            insertRecordCallbacks['Fizzy Foo'](errorInsertingFizzyFooRecord);

                            errorInsertingSweetShizzleRecord = new Error('Some other error');
                            insertRecordCallbacks['Sweet Shizzle'](errorInsertingSweetShizzleRecord);
                        });

                        it('It should report the Fizzy Foo error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingFizzyFooRecord);
                        });

                        it('It should report the Sweet Shizzle error to the console', () => {
                            expect(console.error).to.have.been.calledWithExactly(errorInsertingSweetShizzleRecord);
                        });

                        it('It should report 2 errors to the console', () => {
                            expect(console.error).to.have.been.calledTwice;
                        });

                        it('It should log the failure message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB FAILED - SEE ERRORS');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });

                    describe('When all restocking records were inserted successfully', () => {
                        beforeEach(() => {
                            insertRecordCallbacks['Cola'](null, 1);
                            insertRecordCallbacks['Fizzy Foo'](null, 2);
                            insertRecordCallbacks['Sweet Shizzle'](null, 3);
                        });

                        it('It should not report any errors to the console', () => {
                            expect(console.error).to.not.have.been.called;
                        });

                        it('It should log the success message to the console', () => {
                            expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB SUCCESSFUL');
                        });

                        it('It should only log one message to the console', () => {
                            expect(console.log).to.have.been.calledOnce;
                        });
                    });
                });

                describe('When the collection was queried successfully and no products needed restocking', () => {
                    let records;

                    beforeEach(() => {
                        records = [
                            { name: 'Cola', stockLevel: 8 },
                            { name: 'Fizzy Foo', stockLevel: 4 },
                            { name: 'Berry Splat', stockLevel: 5 },
                            { name: 'Sweet Shizzle', stockLevel: 6 },
                            { name: 'Tropicrazy', stockLevel: 7 }
                        ];
                        queryCallback(null, records);
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).not.to.have.been.called;
                    });

                    it('It should not insert any restocking records', () => {
                        expect(database.insertRecord).to.not.have.been.called;
                    });

                    it('It should log the success message to the console', () => {
                        expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB SUCCESSFUL');
                    });

                    it('It should only log one message to the console', () => {
                        expect(console.log).to.have.been.calledOnce;
                    });
                });

                describe('When the collection was queried successfully and 3 of 5 products needed restocking and the inserting of restocking records was synchronous', () => {
                    let records;

                    beforeEach(() => {
                        records = [
                            { name: 'Cola', stockLevel: 1 },
                            { name: 'Fizzy Foo', stockLevel: 0 },
                            { name: 'Berry Splat', stockLevel: 5 },
                            { name: 'Sweet Shizzle', stockLevel: 2 },
                            { name: 'Tropicrazy', stockLevel: 7 }
                        ];
                        let id = 1;
                        database.insertRecord = sinon.spy((collection, record, callback) => {
                            insertRecordCallbacks[record.productName] = callback;
                            callback(null, id++);
                        });
                        queryCallback(null, records);
                    });

                    it('It should not report any errors to the console', () => {
                        expect(console.error).not.to.have.been.called;
                    });

                    it('It should insert a restocking record for Cola', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Cola' }, insertRecordCallbacks['Cola']);
                    });

                    it('It should insert a restocking record for Fizzy Foo', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Fizzy Foo' }, insertRecordCallbacks['Fizzy Foo']);
                    });

                    it('It should insert a restocking record for Sweet Shizzle', () => {
                        expect(database.insertRecord).to.have.been.calledWithExactly('restocking', { productName: 'Sweet Shizzle' }, insertRecordCallbacks['Sweet Shizzle']);
                    });

                    it('It should log the success message to the console', () => {
                        expect(console.log).to.have.been.calledWithExactly('RESTOCKING JOB SUCCESSFUL');
                    });

                    it('It should only log one message to the console', () => {
                        expect(console.log).to.have.been.calledOnce;
                    });

                    it('It should only log the success message to the console once', () => {
                        expect(console.log).to.have.been.calledOnce;
                    });
                });
            });
        });
    });

    describe('Exercise 10 - When requesting data', () => {
        let getData, usersCallback;

        beforeEach(() => {
            getData = sinon.spy((url, callback) => {
                usersCallback = callback;
            });
            callbacks.exercise10(getData);
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

            describe('When 3 seconds have passed', () => {
                beforeEach(() => {
                    console.log.reset();
                    console.error.reset();
                    return zurvan.advanceTime(3000);
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

            describe('When 3 seconds have passed', () => {
                beforeEach(() => {
                    console.log.reset();
                    console.error.reset();
                    return zurvan.advanceTime(3000);
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).to.not.have.been.called;
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).to.not.have.been.called;
                });
            });
        });

        describe('When 3 seconds have passed', () => {
            beforeEach(() => {
                return zurvan.advanceTime(3000);
            });

            it('It should log TIMEOUT to the console', () => {
                expect(console.log).to.have.been.calledWithExactly('TIMEOUT');
            });

            it('It should not report any errors to the console', () => {
                expect(console.error).to.not.have.been.called;
            });

            describe('When the data has been retrieved successfully', () => {
                let data;

                beforeEach(() => {
                    console.log.reset();
                    console.error.reset();
                    data = { foo: 'bar' };
                    usersCallback(null, data);
                });

                it('It should not log anything to the console', () => {
                    expect(console.log).to.not.have.been.called;
                });

                it('It should not report any errors to the console', () => {
                    expect(console.error).to.not.have.been.called;
                });
            });

            describe('When there was an error retrieving the data', () => {
                let error;

                beforeEach(() => {
                    console.log.reset();
                    console.error.reset();
                    error = new Error('Could not retrieve data');
                    usersCallback(error);
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
});