"use strict";

let expect = require("chai").expect;
let promises = require("../../lib/core-javascript/promises");
let sinon = require("sinon");
let utils = require("../../utils");
let inspect = require("es6-promise-inspect");

describe("Promises", function() {
  let sandbox;
  let clock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, "log");
    sandbox.stub(console, "error");
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  describe("Creating promises", function() {
    it("Should be able to return a resolved promise", function() {
      expect(inspect.getStatus(promises.getResolvedPromise())).to.equal(
        "resolved"
      );
    });

    it("Should be able to return a promise that resolves with the given primitive value", function() {
      return promises.getPromiseResolvedWith("foo").then(result => {
        expect(result).to.equal("foo");
      });
    });

    it("Should be able to return a promise that resolves with the given object", function() {
      let resolutionValue = {};
      return promises.getPromiseResolvedWith(resolutionValue).then(result => {
        expect(result).to.equal(resolutionValue);
      });
    });

    it("Should be able to return a rejected promise", function() {
      expect(inspect.getStatus(promises.getRejectedPromise())).to.equal(
        "rejected"
      );
    });

    it("Should be able to return a promise that rejects with the given primitive value", function() {
      return promises
        .getPromiseRejectedWith("foo")
        .then(() => {
          throw new Error("Promise should not have resolved");
        })
        .catch(result => {
          expect(result).to.equal("foo");
        });
    });

    it("Should be able to return a promise that rejects with the given object", function() {
      let rejectionValue = new Error();
      return promises
        .getPromiseRejectedWith(rejectionValue)
        .then(() => {
          throw new Error("Promise should not have resolved");
        })
        .catch(result => {
          expect(result).to.equal(rejectionValue);
        });
    });

    it("Should be able to return a pending promise", function() {
      expect(inspect.getStatus(promises.getPendingPromise())).to.equal(
        "pending"
      );
    });
  });

  describe("Forking - Given a pending promise", () => {
    let promise,
      resolutionHandler,
      rejectionHandler,
      resolve,
      reject,
      returnValue;

    beforeEach(() => {
      promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      promise.catch(() => {});
      utils.silenceErrorsFromThen(promise);
      resolutionHandler = sinon.stub();
      rejectionHandler = sinon.stub();
      returnValue = promises.forkingPromises(
        promise,
        resolutionHandler,
        rejectionHandler
      );
      return utils.waitForEmptyQueue();
    });

    it("It should not return anything", () => {
      expect(returnValue).to.been.undefined;
    });

    it("It should not call the resolution handler", () => {
      expect(resolutionHandler).to.not.have.been.called;
    });

    it("It should not call the rejection handler", () => {
      expect(rejectionHandler).to.not.have.been.called;
    });

    describe("When the promise is resolved", () => {
      let resolutionValue;

      beforeEach(() => {
        resolutionValue = { foo: "123" };
      });

      describe("And the resolution handler executes without any error and does not return a rejected promise", () => {
        beforeEach(() => {
          resolve(resolutionValue);
          return utils.waitForEmptyQueue();
        });

        it("It should call the resolution handler with the resolution value", () => {
          expect(resolutionHandler).to.have.been.calledWithExactly(
            resolutionValue
          );
        });

        it("It should not call the rejection handler", () => {
          expect(rejectionHandler).to.not.have.been.called;
        });
      });

      describe("And the resolution handler executes and throws an error", () => {
        beforeEach(() => {
          resolutionHandler.throws();
          resolve(resolutionValue);
          return utils.waitForEmptyQueue();
        });

        it("It should call the resolution handler with the resolution value", () => {
          expect(resolutionHandler).to.have.been.calledWithExactly(
            resolutionValue
          );
        });

        it("It should not call the rejection handler", () => {
          expect(rejectionHandler).to.not.have.been.called;
        });
      });
    });

    describe("When the promise is rejected", () => {
      let rejectionValue;

      beforeEach(() => {
        rejectionValue = new Error("Some error");
        reject(rejectionValue);
        return utils.waitForEmptyQueue();
      });

      it("It should call the rejection handler with the rejection value", () => {
        expect(rejectionHandler).to.have.been.calledWithExactly(rejectionValue);
      });

      it("It should not call the resolution handler", () => {
        expect(resolutionHandler).to.not.have.been.called;
      });
    });
  });

  describe("Error Chaining - Given a pending promise", () => {
    let promise,
      resolutionHandler,
      rejectionHandler,
      resolve,
      reject,
      returnValue;

    beforeEach(() => {
      promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      promise.catch(() => {});
      utils.silenceErrorsFromThen(promise);
      resolutionHandler = sinon.stub();
      rejectionHandler = sinon.stub();
      returnValue = promises.promiseErrorChaining(
        promise,
        resolutionHandler,
        rejectionHandler
      );
      return utils.waitForEmptyQueue();
    });

    it("It should not return anything", () => {
      expect(returnValue).to.been.undefined;
    });

    it("It should not call the resolution handler", () => {
      expect(resolutionHandler).to.not.have.been.called;
    });

    it("It should not call the rejection handler", () => {
      expect(rejectionHandler).to.not.have.been.called;
    });

    describe("When the promise is resolved", () => {
      let resolutionValue;

      beforeEach(() => {
        resolutionValue = { foo: "123" };
      });

      describe("And the resolution handler executes without any error and does not return a rejected promise", () => {
        beforeEach(() => {
          resolve(resolutionValue);
          return utils.waitForEmptyQueue();
        });

        it("It should call the resolution handler with the resolution value", () => {
          expect(resolutionHandler).to.have.been.calledWithExactly(
            resolutionValue
          );
        });

        it("It should not call the rejection handler", () => {
          expect(rejectionHandler).to.not.have.been.called;
        });
      });

      describe("And the resolution handler executes and throws an error", () => {
        let errorThrown;

        beforeEach(() => {
          errorThrown = new Error(
            "Some error during execution of the resolution handler"
          );
          resolutionHandler.throws(errorThrown);
          resolve(resolutionValue);
          return utils.waitForEmptyQueue();
        });

        it("It should call the resolution handler with the resolution value", () => {
          expect(resolutionHandler).to.have.been.calledWithExactly(
            resolutionValue
          );
        });

        it("It should call the rejection handler with the error that was thrown by the resolution handler", () => {
          expect(rejectionHandler).to.have.been.calledWithExactly(errorThrown);
        });
      });

      describe("And the resolution handler executes and returns a rejected promise", () => {
        let rejectionValue;

        beforeEach(() => {
          rejectionValue = { bar: "456" };
          resolutionHandler.returns(Promise.reject(rejectionValue));
          resolve(resolutionValue);
          return utils.waitForEmptyQueue();
        });

        it("It should call the resolution handler with the resolution value", () => {
          expect(resolutionHandler).to.have.been.calledWithExactly(
            resolutionValue
          );
        });

        it("It should call the rejection handler with the rejection value of the rejected promise that was returned by the resolution handler", () => {
          expect(rejectionHandler).to.have.been.calledWithExactly(
            rejectionValue
          );
        });
      });
    });

    describe("When the promise is rejected", () => {
      let rejectionValue;

      beforeEach(() => {
        rejectionValue = new Error("Some error");
        reject(rejectionValue);
        return utils.waitForEmptyQueue();
      });

      it("It should call the rejection handler with the rejection value", () => {
        expect(rejectionHandler).to.have.been.calledWithExactly(rejectionValue);
      });

      it("It should not call the resolution handler", () => {
        expect(resolutionHandler).to.not.have.been.called;
      });
    });
  });

  describe("Exercise 1 - When registering a user", () => {
    let registerUser, registerUserDeferred;

    beforeEach(() => {
      registerUser = sinon.spy(() => {
        registerUserDeferred = Promise.defer();
        return registerUserDeferred.promise;
      });
      promises.exercise1(registerUser);
      return utils.waitForEmptyQueue();
    });

    it("It should have registered a user", () => {
      expect(registerUser).to.have.been.called;
    });

    it("It should not log anything to the console", () => {
      expect(console.log).to.not.have.been.called;
    });

    describe("When the user has been registered", () => {
      beforeEach(() => {
        registerUserDeferred.resolve();
        return utils.waitForEmptyQueue();
      });

      it("It should log a notification to the console", () => {
        expect(console.log).to.have.been.calledWithExactly("USER REGISTERED");
      });
    });
  });

  describe("Exercise 2 - When placing an order", () => {
    let placeOrder, placeOrderDeferred;

    beforeEach(() => {
      placeOrder = sinon.spy(() => {
        placeOrderDeferred = Promise.defer();
        return placeOrderDeferred.promise;
      });
      promises.exercise2(placeOrder);
      return utils.waitForEmptyQueue();
    });

    it("It should have placed an order", () => {
      expect(placeOrder).to.have.been.called;
    });

    it("It should not log anything to the console", () => {
      expect(console.log).to.not.have.been.called;
    });

    describe("When the order has been placed successfully", () => {
      let orderReferenceNumber;

      beforeEach(() => {
        orderReferenceNumber = "Order Reference Number 12345";
        placeOrderDeferred.resolve(orderReferenceNumber);
        return utils.waitForEmptyQueue();
      });

      it("It should log the order reference number to the console", () => {
        expect(console.log).to.have.been.calledWithExactly(
          orderReferenceNumber
        );
      });
    });
  });

  describe("Exercise 3 - When requesting data", () => {
    let getData, getDataDeferred;

    beforeEach(() => {
      getData = sinon.spy(() => {
        getDataDeferred = Promise.defer();
        return getDataDeferred.promise;
      });
      promises.exercise3(getData);
      return utils.waitForEmptyQueue();
    });

    it('It should have requested data from "someUrl"', () => {
      expect(getData).to.have.been.calledWithExactly("someUrl");
    });

    it("It should not log anything to the console", () => {
      expect(console.log).to.not.have.been.called;
    });

    it("It should not report any errors to the console", () => {
      expect(console.error).to.not.have.been.called;
    });

    describe("When the data has been retrieved successfully", () => {
      let data;

      beforeEach(() => {
        data = { foo: "bar" };
        getDataDeferred.resolve(data);
        return utils.waitForEmptyQueue();
      });

      it("It should log the data to the console", () => {
        expect(console.log).to.have.been.calledWithExactly(data);
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).to.not.have.been.called;
      });
    });

    describe("When there was an error retrieving the data", () => {
      let error;

      beforeEach(() => {
        error = new Error("Could not retrieve data");
        getDataDeferred.reject(error);
        return utils.waitForEmptyQueue();
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      it("It should report the error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(error);
      });
    });
  });

  describe("Exercise 4 - When requesting data", () => {
    let getData, getDataDeferred;

    describe("And a synchronous error is not thrown", () => {
      beforeEach(() => {
        getData = sinon.spy(() => {
          getDataDeferred = Promise.defer();
          return getDataDeferred.promise;
        });
        promises.exercise4(getData);
        return utils.waitForEmptyQueue();
      });

      it('It should have requested data from "someUrl"', () => {
        expect(getData).to.have.been.calledWithExactly("someUrl");
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).to.not.have.been.called;
      });

      describe("When the data has been retrieved successfully", () => {
        let data;

        beforeEach(() => {
          data = { foo: "bar" };
          getDataDeferred.resolve(data);
          return utils.waitForEmptyQueue();
        });

        it("It should log the data to the console", () => {
          expect(console.log).to.have.been.calledWithExactly(data);
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).to.not.have.been.called;
        });
      });

      describe("When there was an error retrieving the data", () => {
        let error;

        beforeEach(() => {
          error = new Error("Could not retrieve data");
          getDataDeferred.reject(error);
          return utils.waitForEmptyQueue();
        });

        it("It should not log anything to the console", () => {
          expect(console.log).to.not.have.been.called;
        });

        it("It should report the error to the console", () => {
          expect(console.error).to.have.been.calledWithExactly(error);
        });
      });
    });

    describe("And a synchronous error is thrown", () => {
      let error;

      beforeEach(() => {
        error = new Error("A synchronous error");
        getData = sinon.spy(() => {
          throw error;
        });
        promises.exercise4(getData);
        return utils.waitForEmptyQueue();
      });

      it('It should have requested data from "someUrl"', () => {
        expect(getData).to.have.been.calledWithExactly("someUrl");
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      it("It should report the synchronous error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(error);
      });
    });
  });

  describe("Exercise 5 - When requesting data", () => {
    let getData, getDataDeferred;

    describe("The solution", () => {
      it("It should not contain a try/catch block", () => {
        // Execute function to Wallaby picks up changes
        promises.exercise5(() => Promise.reject(new Error()));

        let code = utils.removeInstrumentation(promises.exercise5.toString());
        expect(code).to.not.contain("try");
        expect(code).to.not.contain("catch");
      });
    });

    describe("And a synchronous error is not thrown", () => {
      beforeEach(() => {
        getData = sinon.spy(() => {
          getDataDeferred = Promise.defer();
          return getDataDeferred.promise;
        });
        promises.exercise5(getData);
        return utils.waitForEmptyQueue();
      });

      it('It should have requested data from "someUrl"', () => {
        expect(getData).to.have.been.calledWithExactly("someUrl");
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).to.not.have.been.called;
      });

      describe("When the data has been retrieved successfully", () => {
        let data;

        beforeEach(() => {
          data = { foo: "bar" };
          getDataDeferred.resolve(data);
          return utils.waitForEmptyQueue();
        });

        it("It should log the data to the console", () => {
          expect(console.log).to.have.been.calledWithExactly(data);
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).to.not.have.been.called;
        });
      });

      describe("When there was an error retrieving the data", () => {
        let error;

        beforeEach(() => {
          error = new Error("Could not retrieve data");
          getDataDeferred.reject(error);
          return utils.waitForEmptyQueue();
        });

        it("It should not log anything to the console", () => {
          expect(console.log).to.not.have.been.called;
        });

        it("It should report the error to the console", () => {
          expect(console.error).to.have.been.calledWithExactly(error);
        });
      });
    });

    describe("And a synchronous error is thrown", () => {
      let error;

      beforeEach(() => {
        error = new Error("A synchronous error");
        getData = sinon.spy(() => {
          throw error;
        });
        promises.exercise5(getData);
        return utils.waitForEmptyQueue();
      });

      it('It should have requested data from "someUrl"', () => {
        expect(getData).to.have.been.calledWithExactly("someUrl");
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      it("It should report the synchronous error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(error);
      });
    });
  });

  describe("Exercise 6 - When placing an order and registering a user", () => {
    let placeOrder, registerUser, placeOrderDeferred, registerUserDeferred;

    beforeEach(() => {
      placeOrder = sinon.spy(() => {
        placeOrderDeferred = Promise.defer();
        return placeOrderDeferred.promise;
      });
      registerUser = sinon.spy(() => {
        registerUserDeferred = Promise.defer();
        return registerUserDeferred.promise;
      });
      promises.exercise6(placeOrder, registerUser);
      return utils.waitForEmptyQueue();
    });

    it("It should have placed an order", () => {
      expect(placeOrder).to.have.been.called;
    });

    it("It should have registered a new user", () => {
      expect(registerUser).to.have.been.called;
    });

    it("It should not log anything to the console", () => {
      expect(console.log).to.not.have.been.called;
    });

    describe("When the order has been placed successfully", () => {
      let orderReferenceNumber;

      beforeEach(() => {
        orderReferenceNumber = "Order Reference Number 12345";
        placeOrderDeferred.resolve(orderReferenceNumber);
        return utils.waitForEmptyQueue();
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      describe("When the user has been registered successfully", () => {
        let userId;

        beforeEach(() => {
          userId = "User ID 12231221";
          registerUserDeferred.resolve(userId);
          return utils.waitForEmptyQueue();
        });

        it("It should output the message to the console", () => {
          expect(console.log).to.have.been.calledWithExactly(
            `User ${userId} placed order ${orderReferenceNumber}`
          );
        });
      });
    });

    describe("When the user has been registered successfully", () => {
      let userId;

      beforeEach(() => {
        userId = "User ID 12231221";
        registerUserDeferred.resolve(userId);
        return utils.waitForEmptyQueue();
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      describe("When the order has been placed successfully", () => {
        let orderReferenceNumber;

        beforeEach(() => {
          orderReferenceNumber = "Order Reference Number 12345";
          placeOrderDeferred.resolve(orderReferenceNumber);
          return utils.waitForEmptyQueue();
        });

        it("It should output the message to the console", () => {
          expect(console.log).to.have.been.calledWithExactly(
            `User ${userId} placed order ${orderReferenceNumber}`
          );
        });
      });
    });
  });

  describe("Exercise 7 - When inserting data into the database", () => {
    let connect, connectDeferred;

    beforeEach(() => {
      connect = sinon.spy(() => {
        connectDeferred = Promise.defer();
        return connectDeferred.promise;
      });
      promises.exercise7(connect);
      return utils.waitForEmptyQueue();
    });

    it("It should connect to the database", () => {
      expect(connect).to.have.been.calledWithExactly(
        "mongodb://mongo-server.foo.com:44017"
      );
    });

    describe("When there was an error connecting to the database server", () => {
      let errorConnecting;

      beforeEach(() => {
        errorConnecting = new Error("Server not found");
        connectDeferred.reject(errorConnecting);
        return utils.waitForEmptyQueue();
      });

      it("It should report the error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(errorConnecting);
      });

      it("It should not log anything to the console", () => {
        expect(console.log).not.to.have.been.called;
      });
    });

    describe("When the connection to the database server was established successfully", () => {
      let connection, openDatabaseDeferred;

      beforeEach(() => {
        connection = {
          openDatabase: sinon.spy(() => {
            openDatabaseDeferred = Promise.defer();
            return openDatabaseDeferred.promise;
          })
        };
        connectDeferred.resolve(connection);
        return utils.waitForEmptyQueue();
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).not.to.have.been.called;
      });

      it("It should not log anything to the console", () => {
        expect(console.log).not.to.have.been.called;
      });

      it("It should open the database", () => {
        expect(connection.openDatabase).to.have.been.calledWithExactly(
          "Master"
        );
      });

      describe("When there was an error opening the database", () => {
        let errorOpeningDatabase;

        beforeEach(() => {
          errorOpeningDatabase = new Error("Database does not exist");
          openDatabaseDeferred.reject(errorOpeningDatabase);
          return utils.waitForEmptyQueue();
        });

        it("It should report the error to the console", () => {
          expect(console.error).to.have.been.calledWithExactly(
            errorOpeningDatabase
          );
        });

        it("It should not log anything to the console", () => {
          expect(console.log).not.to.have.been.called;
        });
      });

      describe("When the database was opened successfully", () => {
        let database, insertRecordDeferred;

        beforeEach(() => {
          database = {
            insertRecord: sinon.spy(() => {
              insertRecordDeferred = Promise.defer();
              return insertRecordDeferred.promise;
            })
          };
          openDatabaseDeferred.resolve(database);
          return utils.waitForEmptyQueue();
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).not.to.have.been.called;
        });

        it("It should not log anything to the console", () => {
          expect(console.log).not.to.have.been.called;
        });

        it("It should insert the record as expected", () => {
          expect(database.insertRecord).to.have.been.calledWithExactly(
            "status",
            { status: `I'm ready!` }
          );
        });

        describe("When there was an error inserting the record", () => {
          let errorInsertingRecord;

          beforeEach(() => {
            errorInsertingRecord = new Error("Connection timeout");
            insertRecordDeferred.reject(errorInsertingRecord);
            return utils.waitForEmptyQueue();
          });

          it("It should report the error to the console", () => {
            expect(console.error).to.have.been.calledWithExactly(
              errorInsertingRecord
            );
          });

          it("It should not log anything to the console", () => {
            expect(console.log).not.to.have.been.called;
          });
        });

        describe("When the record was inserted successfully", () => {
          let recordId;

          beforeEach(() => {
            recordId = "some_record_id";
            insertRecordDeferred.resolve(recordId);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should log the record ID to the console", () => {
            expect(console.log).to.have.been.calledWithExactly(recordId);
          });
        });
      });
    });
  });

  describe("Exercise 8 - When running the restocking job", () => {
    let connect, connectDeferred;

    beforeEach(() => {
      connect = sinon.spy(() => {
        connectDeferred = Promise.defer();
        return connectDeferred.promise;
      });
      promises.exercise8(connect);
      return utils.waitForEmptyQueue();
    });

    it("It should connect to the database", () => {
      expect(connect).to.have.been.calledWithExactly(
        "mongodb://mongo-server.foo.com:44017"
      );
    });

    describe("When there was an error connecting to the database server", () => {
      let errorConnecting;

      beforeEach(() => {
        errorConnecting = new Error("Server not found");
        connectDeferred.reject(errorConnecting);
        return utils.waitForEmptyQueue();
      });

      it("It should report the error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(errorConnecting);
      });

      it("It should log the failure message to the console", () => {
        expect(console.log).to.have.been.calledWithExactly(
          "RESTOCKING JOB FAILED - SEE ERRORS"
        );
      });

      it("It should only log one message to the console", () => {
        expect(console.log).to.have.been.calledOnce;
      });
    });

    describe("When the connection to the database server was established successfully", () => {
      let connection, openDatabaseDeferred;

      beforeEach(() => {
        connection = {
          openDatabase: sinon.spy(() => {
            openDatabaseDeferred = Promise.defer();
            return openDatabaseDeferred.promise;
          })
        };
        connectDeferred.resolve(connection);
        return utils.waitForEmptyQueue();
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).not.to.have.been.called;
      });

      it("It should not log anything to the console", () => {
        expect(console.log).not.to.have.been.called;
      });

      it("It should open the Shop database", () => {
        expect(connection.openDatabase).to.have.been.calledWithExactly("Shop");
      });

      describe("When there was an error opening the database", () => {
        let errorOpeningDatabase;

        beforeEach(() => {
          errorOpeningDatabase = new Error("Database does not exist");
          openDatabaseDeferred.reject(errorOpeningDatabase);
          return utils.waitForEmptyQueue();
        });

        it("It should report the error to the console", () => {
          expect(console.error).to.have.been.calledWithExactly(
            errorOpeningDatabase
          );
        });

        it("It should log the failure message to the console", () => {
          expect(console.log).to.have.been.calledWithExactly(
            "RESTOCKING JOB FAILED - SEE ERRORS"
          );
        });

        it("It should only log one message to the console", () => {
          expect(console.log).to.have.been.calledOnce;
        });
      });

      describe("When the database was opened successfully", () => {
        let database, insertRecordDeferreds, queryDeferred;

        beforeEach(() => {
          insertRecordDeferreds = {};
          database = {
            insertRecord: sinon.spy((collectionName, record) => {
              insertRecordDeferreds[record.productName] = Promise.defer();
              return insertRecordDeferreds[record.productName].promise;
            }),
            query: sinon.spy(() => {
              queryDeferred = Promise.defer();
              return queryDeferred.promise;
            })
          };
          openDatabaseDeferred.resolve(database);
          return utils.waitForEmptyQueue();
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).not.to.have.been.called;
        });

        it("It should not log anything to the console", () => {
          expect(console.log).not.to.have.been.called;
        });

        it("It should query the products collection as expected", () => {
          expect(database.query).to.have.been.calledWithExactly("products");
        });

        it("It should not insert any records", () => {
          expect(database.insertRecord).not.to.have.been.called;
        });

        describe("When there was an error querying the collection", () => {
          let errorQueryingCollection;

          beforeEach(() => {
            errorQueryingCollection = new Error("Collection does not exist");
            queryDeferred.reject(errorQueryingCollection);
            return utils.waitForEmptyQueue();
          });

          it("It should report the error to the console", () => {
            expect(console.error).to.have.been.calledWithExactly(
              errorQueryingCollection
            );
          });

          it("It should log the failure message to the console", () => {
            expect(console.log).to.have.been.calledWithExactly(
              "RESTOCKING JOB FAILED - SEE ERRORS"
            );
          });

          it("It should only log one message to the console", () => {
            expect(console.log).to.have.been.calledOnce;
          });

          it("It should not insert any records", () => {
            expect(database.insertRecord).not.to.have.been.called;
          });
        });

        describe("When the collection was queried successfully and 3 of 5 products needed restocking", () => {
          let records;

          beforeEach(() => {
            records = [
              { name: "Cola", stockLevel: 1 },
              { name: "Fizzy Foo", stockLevel: 0 },
              { name: "Berry Splat", stockLevel: 5 },
              { name: "Sweet Shizzle", stockLevel: 2 },
              { name: "Tropicrazy", stockLevel: 7 }
            ];
            queryDeferred.resolve(records);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should not log anything to the console", () => {
            expect(console.log).not.to.have.been.called;
          });

          it("It should insert a restocking record for Cola", () => {
            expect(database.insertRecord).to.have.been.calledWithExactly(
              "restocking",
              { productName: "Cola" }
            );
          });

          it("It should insert a restocking record for Fizzy Foo", () => {
            expect(database.insertRecord).to.have.been.calledWithExactly(
              "restocking",
              { productName: "Fizzy Foo" }
            );
          });

          it("It should insert a restocking record for Sweet Shizzle", () => {
            expect(database.insertRecord).to.have.been.calledWithExactly(
              "restocking",
              { productName: "Sweet Shizzle" }
            );
          });

          describe("When there was an error inserting the restocking record for Cola, but the restocking record for Fizzy Foo and Sweet Shizzle were successfully inserted", () => {
            let errorInsertingRecord;

            beforeEach(() => {
              errorInsertingRecord = new Error("Connection error");
              insertRecordDeferreds["Cola"].reject(errorInsertingRecord);
              insertRecordDeferreds["Fizzy Foo"].resolve(1);
              insertRecordDeferreds["Sweet Shizzle"].resolve(2);
              return utils.waitForEmptyQueue();
            });

            it("It should report the error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingRecord
              );
            });

            it("It should report only 1 error to the console", () => {
              expect(console.error).to.have.been.calledOnce;
            });

            it("It should log the failure message to the console", () => {
              expect(console.log).to.have.been.calledWithExactly(
                "RESTOCKING JOB FAILED - SEE ERRORS"
              );
            });

            it("It should only log one message to the console", () => {
              expect(console.log).to.have.been.calledOnce;
            });
          });

          describe("When there was an error inserting the restocking record for Fizzy Foo, but the restocking record for Cola and Sweet Shizzle were successfully inserted", () => {
            let errorInsertingRecord;

            beforeEach(() => {
              insertRecordDeferreds["Cola"].resolve(1);
              errorInsertingRecord = new Error("Connection error");
              insertRecordDeferreds["Fizzy Foo"].reject(errorInsertingRecord);
              insertRecordDeferreds["Sweet Shizzle"].resolve(2);
              return utils.waitForEmptyQueue();
            });

            it("It should report the error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingRecord
              );
            });

            it("It should report only 1 error to the console", () => {
              expect(console.error).to.have.been.calledOnce;
            });

            it("It should log the failure message to the console", () => {
              expect(console.log).to.have.been.calledWithExactly(
                "RESTOCKING JOB FAILED - SEE ERRORS"
              );
            });

            it("It should only log one message to the console", () => {
              expect(console.log).to.have.been.calledOnce;
            });
          });

          describe("When there were errors inserting the restocking records for Fizzy Foo and Sweet Shizzle, but the restocking record for Cola was successfully inserted", () => {
            let errorInsertingFizzyFooRecord, errorInsertingSweetShizzleRecord;

            beforeEach(() => {
              insertRecordDeferreds["Cola"].resolve(1);

              errorInsertingFizzyFooRecord = new Error("Connection error");
              insertRecordDeferreds["Fizzy Foo"].reject(
                errorInsertingFizzyFooRecord
              );

              errorInsertingSweetShizzleRecord = new Error("Some other error");
              insertRecordDeferreds["Sweet Shizzle"].reject(
                errorInsertingSweetShizzleRecord
              );
              return utils.waitForEmptyQueue();
            });

            it("It should report the Fizzy Foo error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingFizzyFooRecord
              );
            });

            it("It should report the Sweet Shizzle error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingSweetShizzleRecord
              );
            });

            it("It should report 2 errors to the console", () => {
              expect(console.error).to.have.been.calledTwice;
            });

            it("It should log the failure message to the console", () => {
              expect(console.log).to.have.been.calledWithExactly(
                "RESTOCKING JOB FAILED - SEE ERRORS"
              );
            });

            it("It should only log one message to the console", () => {
              expect(console.log).to.have.been.calledOnce;
            });
          });

          describe("When all restocking records were inserted successfully", () => {
            beforeEach(() => {
              insertRecordDeferreds["Cola"].resolve(1);
              insertRecordDeferreds["Fizzy Foo"].resolve(2);
              insertRecordDeferreds["Sweet Shizzle"].resolve(3);
              return utils.waitForEmptyQueue();
            });

            it("It should not report any errors to the console", () => {
              expect(console.error).to.not.have.been.called;
            });

            it("It should log the success message to the console", () => {
              expect(console.log).to.have.been.calledWithExactly(
                "RESTOCKING JOB SUCCESSFUL"
              );
            });

            it("It should only log one message to the console", () => {
              expect(console.log).to.have.been.calledOnce;
            });
          });
        });

        describe("When the collection was queried successfully and no products needed restocking", () => {
          let records;

          beforeEach(() => {
            records = [
              { name: "Cola", stockLevel: 8 },
              { name: "Fizzy Foo", stockLevel: 4 },
              { name: "Berry Splat", stockLevel: 5 },
              { name: "Sweet Shizzle", stockLevel: 6 },
              { name: "Tropicrazy", stockLevel: 7 }
            ];
            queryDeferred.resolve(records);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should not insert any restocking records", () => {
            expect(database.insertRecord).to.not.have.been.called;
          });

          it("It should log the success message to the console", () => {
            expect(console.log).to.have.been.calledWithExactly(
              "RESTOCKING JOB SUCCESSFUL"
            );
          });

          it("It should only log one message to the console", () => {
            expect(console.log).to.have.been.calledOnce;
          });
        });

        describe("When the collection was queried successfully and there were no products", () => {
          beforeEach(() => {
            queryDeferred.resolve([]);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should not insert any restocking records", () => {
            expect(database.insertRecord).to.not.have.been.called;
          });

          it("It should log the success message to the console", () => {
            expect(console.log).to.have.been.calledWithExactly(
              "RESTOCKING JOB SUCCESSFUL"
            );
          });

          it("It should only log one message to the console", () => {
            expect(console.log).to.have.been.calledOnce;
          });
        });
      });
    });
  });

  describe("Exercise 9 - When running the restocking job", () => {
    let exercise9Promise, connect, connectDeferred;

    beforeEach(() => {
      connect = sinon.spy(() => {
        connectDeferred = Promise.defer();
        return connectDeferred.promise;
      });
      exercise9Promise = promises.exercise9(connect);
      exercise9Promise.catch(() => {});
      return utils.waitForEmptyQueue();
    });

    it("It should connect to the database", () => {
      expect(connect).to.have.been.calledWithExactly(
        "mongodb://mongo-server.foo.com:44017"
      );
    });

    it("It should not yet resolve/reject the returned promise", () => {
      expect(inspect.getStatus(exercise9Promise)).to.equal("pending");
    });

    describe("When there was an error connecting to the database server", () => {
      let errorConnecting;

      beforeEach(() => {
        errorConnecting = new Error("Server not found");
        connectDeferred.reject(errorConnecting);
        return utils.waitForEmptyQueue();
      });

      it("It should report the error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(errorConnecting);
      });

      it("It should reject the returned promise", () => {
        expect(inspect.getStatus(exercise9Promise)).to.equal("rejected");
      });

      it("It should reject the returned promise with the expected message", () => {
        return exercise9Promise.catch(error => {
          expect(error.message).to.equal("RESTOCKING JOB FAILED - SEE ERRORS");
        });
      });
    });

    describe("When the connection to the database server was established successfully", () => {
      let connection, openDatabaseDeferred;

      beforeEach(() => {
        connection = {
          openDatabase: sinon.spy(() => {
            openDatabaseDeferred = Promise.defer();
            return openDatabaseDeferred.promise;
          })
        };
        connectDeferred.resolve(connection);
        return utils.waitForEmptyQueue();
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).not.to.have.been.called;
      });

      it("It should not yet resolve/reject the returned promise", () => {
        expect(inspect.getStatus(exercise9Promise)).to.equal("pending");
      });

      it("It should open the Shop database", () => {
        expect(connection.openDatabase).to.have.been.calledWithExactly("Shop");
      });

      describe("When there was an error opening the database", () => {
        let errorOpeningDatabase;

        beforeEach(() => {
          errorOpeningDatabase = new Error("Database does not exist");
          openDatabaseDeferred.reject(errorOpeningDatabase);
          return utils.waitForEmptyQueue();
        });

        it("It should report the error to the console", () => {
          expect(console.error).to.have.been.calledWithExactly(
            errorOpeningDatabase
          );
        });

        it("It should reject the returned promise", () => {
          expect(inspect.getStatus(exercise9Promise)).to.equal("rejected");
        });

        it("It should reject the returned promise with the expected message", () => {
          return exercise9Promise.catch(error => {
            expect(error.message).to.equal(
              "RESTOCKING JOB FAILED - SEE ERRORS"
            );
          });
        });
      });

      describe("When the database was opened successfully", () => {
        let database, insertRecordDeferreds, queryDeferred;

        beforeEach(() => {
          insertRecordDeferreds = {};
          database = {
            insertRecord: sinon.spy((collectionName, record) => {
              insertRecordDeferreds[record.productName] = Promise.defer();
              return insertRecordDeferreds[record.productName].promise;
            }),
            query: sinon.spy(() => {
              queryDeferred = Promise.defer();
              return queryDeferred.promise;
            })
          };
          openDatabaseDeferred.resolve(database);
          return utils.waitForEmptyQueue();
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).not.to.have.been.called;
        });

        it("It should not yet resolve/reject the returned promise", () => {
          expect(inspect.getStatus(exercise9Promise)).to.equal("pending");
        });

        it("It should query the products collection as expected", () => {
          expect(database.query).to.have.been.calledWithExactly("products");
        });

        it("It should not insert any records", () => {
          expect(database.insertRecord).not.to.have.been.called;
        });

        describe("When there was an error querying the collection", () => {
          let errorQueryingCollection;

          beforeEach(() => {
            errorQueryingCollection = new Error("Collection does not exist");
            queryDeferred.reject(errorQueryingCollection);
            return utils.waitForEmptyQueue();
          });

          it("It should report the error to the console", () => {
            expect(console.error).to.have.been.calledWithExactly(
              errorQueryingCollection
            );
          });

          it("It should reject the returned promise", () => {
            expect(inspect.getStatus(exercise9Promise)).to.equal("rejected");
          });

          it("It should reject the returned promise with the expected message", () => {
            return exercise9Promise.catch(error => {
              expect(error.message).to.equal(
                "RESTOCKING JOB FAILED - SEE ERRORS"
              );
            });
          });

          it("It should not insert any records", () => {
            expect(database.insertRecord).not.to.have.been.called;
          });
        });

        describe("When the collection was queried successfully and 3 of 5 products needed restocking", () => {
          let records;

          beforeEach(() => {
            records = [
              { name: "Cola", stockLevel: 1 },
              { name: "Fizzy Foo", stockLevel: 0 },
              { name: "Berry Splat", stockLevel: 5 },
              { name: "Sweet Shizzle", stockLevel: 2 },
              { name: "Tropicrazy", stockLevel: 7 }
            ];
            queryDeferred.resolve(records);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should not yet resolve/reject the returned promise", () => {
            expect(inspect.getStatus(exercise9Promise)).to.equal("pending");
          });

          it("It should insert a restocking record for Cola", () => {
            expect(database.insertRecord).to.have.been.calledWithExactly(
              "restocking",
              { productName: "Cola" }
            );
          });

          it("It should insert a restocking record for Fizzy Foo", () => {
            expect(database.insertRecord).to.have.been.calledWithExactly(
              "restocking",
              { productName: "Fizzy Foo" }
            );
          });

          it("It should insert a restocking record for Sweet Shizzle", () => {
            expect(database.insertRecord).to.have.been.calledWithExactly(
              "restocking",
              { productName: "Sweet Shizzle" }
            );
          });

          describe("When there was an error inserting the restocking record for Cola, but the restocking record for Fizzy Foo and Sweet Shizzle were successfully inserted", () => {
            let errorInsertingRecord;

            beforeEach(() => {
              errorInsertingRecord = new Error("Connection error");
              insertRecordDeferreds["Cola"].reject(errorInsertingRecord);
              insertRecordDeferreds["Fizzy Foo"].resolve(1);
              insertRecordDeferreds["Sweet Shizzle"].resolve(2);
              return utils.waitForEmptyQueue();
            });

            it("It should report the error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingRecord
              );
            });

            it("It should report only 1 error to the console", () => {
              expect(console.error).to.have.been.calledOnce;
            });

            it("It should reject the returned promise", () => {
              expect(inspect.getStatus(exercise9Promise)).to.equal("rejected");
            });

            it("It should reject the returned promise with the expected message", () => {
              return exercise9Promise.catch(error => {
                expect(error.message).to.equal(
                  "RESTOCKING JOB FAILED - SEE ERRORS"
                );
              });
            });
          });

          describe("When there was an error inserting the restocking record for Fizzy Foo, but the restocking record for Cola and Sweet Shizzle were successfully inserted", () => {
            let errorInsertingRecord;

            beforeEach(() => {
              insertRecordDeferreds["Cola"].resolve(1);
              errorInsertingRecord = new Error("Connection error");
              insertRecordDeferreds["Fizzy Foo"].reject(errorInsertingRecord);
              insertRecordDeferreds["Sweet Shizzle"].resolve(2);
              return utils.waitForEmptyQueue();
            });

            it("It should report the error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingRecord
              );
            });

            it("It should report only 1 error to the console", () => {
              expect(console.error).to.have.been.calledOnce;
            });

            it("It should reject the returned promise", () => {
              expect(inspect.getStatus(exercise9Promise)).to.equal("rejected");
            });

            it("It should reject the returned promise with the expected message", () => {
              return exercise9Promise.catch(error => {
                expect(error.message).to.equal(
                  "RESTOCKING JOB FAILED - SEE ERRORS"
                );
              });
            });
          });

          describe("When there were errors inserting the restocking records for Fizzy Foo and Sweet Shizzle, but the restocking record for Cola was successfully inserted", () => {
            let errorInsertingFizzyFooRecord, errorInsertingSweetShizzleRecord;

            beforeEach(() => {
              insertRecordDeferreds["Cola"].resolve(1);

              errorInsertingFizzyFooRecord = new Error("Connection error");
              insertRecordDeferreds["Fizzy Foo"].reject(
                errorInsertingFizzyFooRecord
              );

              errorInsertingSweetShizzleRecord = new Error("Some other error");
              insertRecordDeferreds["Sweet Shizzle"].reject(
                errorInsertingSweetShizzleRecord
              );
              return utils.waitForEmptyQueue();
            });

            it("It should report the Fizzy Foo error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingFizzyFooRecord
              );
            });

            it("It should report the Sweet Shizzle error to the console", () => {
              expect(console.error).to.have.been.calledWithExactly(
                errorInsertingSweetShizzleRecord
              );
            });

            it("It should report 2 errors to the console", () => {
              expect(console.error).to.have.been.calledTwice;
            });

            it("It should reject the returned promise", () => {
              expect(inspect.getStatus(exercise9Promise)).to.equal("rejected");
            });

            it("It should reject the returned promise with the expected message", () => {
              return exercise9Promise.catch(error => {
                expect(error.message).to.equal(
                  "RESTOCKING JOB FAILED - SEE ERRORS"
                );
              });
            });
          });

          describe("When all restocking records were inserted successfully", () => {
            beforeEach(() => {
              insertRecordDeferreds["Cola"].resolve(1);
              insertRecordDeferreds["Fizzy Foo"].resolve(2);
              insertRecordDeferreds["Sweet Shizzle"].resolve(3);
              return utils.waitForEmptyQueue();
            });

            it("It should not report any errors to the console", () => {
              expect(console.error).to.not.have.been.called;
            });

            it("It should resolve the returned promise", () => {
              expect(inspect.getStatus(exercise9Promise)).to.equal("resolved");
            });

            it("It should resolve the returned promise with the expected message", () => {
              return exercise9Promise.then(result => {
                expect(result).to.equal("RESTOCKING JOB SUCCESSFUL");
              });
            });
          });
        });

        describe("When the collection was queried successfully and no products needed restocking", () => {
          let records;

          beforeEach(() => {
            records = [
              { name: "Cola", stockLevel: 8 },
              { name: "Fizzy Foo", stockLevel: 4 },
              { name: "Berry Splat", stockLevel: 5 },
              { name: "Sweet Shizzle", stockLevel: 6 },
              { name: "Tropicrazy", stockLevel: 7 }
            ];
            queryDeferred.resolve(records);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should not insert any restocking records", () => {
            expect(database.insertRecord).to.not.have.been.called;
          });

          it("It should resolve the returned promise", () => {
            expect(inspect.getStatus(exercise9Promise)).to.equal("resolved");
          });

          it("It should resolve the returned promise with the expected message", () => {
            return exercise9Promise.then(result => {
              expect(result).to.equal("RESTOCKING JOB SUCCESSFUL");
            });
          });
        });

        describe("When the collection was queried successfully and there were no products", () => {
          beforeEach(() => {
            queryDeferred.resolve([]);
            return utils.waitForEmptyQueue();
          });

          it("It should not report any errors to the console", () => {
            expect(console.error).not.to.have.been.called;
          });

          it("It should not insert any restocking records", () => {
            expect(database.insertRecord).to.not.have.been.called;
          });

          it("It should resolve the returned promise", () => {
            expect(inspect.getStatus(exercise9Promise)).to.equal("resolved");
          });

          it("It should resolve the returned promise with the expected message", () => {
            return exercise9Promise.then(result => {
              expect(result).to.equal("RESTOCKING JOB SUCCESSFUL");
            });
          });
        });
      });
    });
  });

  describe("Exercise 10 - When requesting data", () => {
    let getData, getDataDeferred;

    beforeEach(() => {
      getData = sinon.spy(() => {
        getDataDeferred = Promise.defer();
        return getDataDeferred.promise;
      });
      promises.exercise10(getData);
      return utils.waitForEmptyQueue();
    });

    it('It should have requested data from "someUrl"', () => {
      expect(getData).to.have.been.calledWithExactly("someUrl");
    });

    it("It should not log anything to the console", () => {
      expect(console.log).to.not.have.been.called;
    });

    it("It should not report any errors to the console", () => {
      expect(console.error).to.not.have.been.called;
    });

    describe("When the data has been retrieved successfully", () => {
      let data;

      beforeEach(() => {
        data = { foo: "bar" };
        getDataDeferred.resolve(data);
        return utils.waitForEmptyQueue();
      });

      it("It should log the data to the console", () => {
        expect(console.log).to.have.been.calledWithExactly(data);
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).to.not.have.been.called;
      });

      describe("When 3 seconds have passed", () => {
        beforeEach(() => {
          console.log.reset();
          console.error.reset();
          clock.tick(3000);
        });

        it("It should not log anything to the console", () => {
          expect(console.log).to.not.have.been.called;
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).to.not.have.been.called;
        });
      });
    });

    describe("When there was an error retrieving the data", () => {
      let error;

      beforeEach(() => {
        error = new Error("Could not retrieve data");
        getDataDeferred.reject(error);
        return utils.waitForEmptyQueue();
      });

      it("It should not log anything to the console", () => {
        expect(console.log).to.not.have.been.called;
      });

      it("It should report the error to the console", () => {
        expect(console.error).to.have.been.calledWithExactly(error);
      });

      describe("When 3 seconds have passed", () => {
        beforeEach(() => {
          console.log.reset();
          console.error.reset();
          clock.tick(3000);
        });

        it("It should not log anything to the console", () => {
          expect(console.log).to.not.have.been.called;
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).to.not.have.been.called;
        });
      });
    });

    describe("When 3 seconds have passed", () => {
      beforeEach(() => {
        clock.tick(3000);
        return utils.waitForEmptyQueue();
      });

      it("It should log TIMEOUT to the console", () => {
        expect(console.log).to.have.been.calledWithExactly("TIMEOUT");
      });

      it("It should not report any errors to the console", () => {
        expect(console.error).to.not.have.been.called;
      });

      describe("When the data has been retrieved successfully", () => {
        let data;

        beforeEach(() => {
          console.log.reset();
          console.error.reset();
          data = { foo: "bar" };
          getDataDeferred.resolve(data);
          return utils.waitForEmptyQueue();
        });

        it("It should not log anything to the console", () => {
          expect(console.log).to.not.have.been.called;
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).to.not.have.been.called;
        });
      });

      describe("When there was an error retrieving the data", () => {
        let error;

        beforeEach(() => {
          console.log.reset();
          console.error.reset();
          error = new Error("Could not retrieve data");
          getDataDeferred.reject(error);
          return utils.waitForEmptyQueue();
        });

        it("It should not log anything to the console", () => {
          expect(console.log).to.not.have.been.called;
        });

        it("It should not report any errors to the console", () => {
          expect(console.error).to.not.have.been.called;
        });
      });
    });
  });
});

// file.only
