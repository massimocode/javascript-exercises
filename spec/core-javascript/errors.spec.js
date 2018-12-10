"use strict";

let expect = require("chai").expect;
let errors = require("../../lib/core-javascript/errors");
let sinon = require("sinon");

describe("Errors", function() {
  describe("Create dictionary of values", () => {
    describe("When creating a dictionary from an array containing unique keys", () => {
      let result, keyValuePairs;

      beforeEach(() => {
        keyValuePairs = [
          { key: "property1", value: "value1" },
          { key: "property2", value: 123 },
          { key: "property3", value: false },
          { key: "property4", value: {} }
        ];
        result = errors.createDictionary(keyValuePairs);
      });

      it("It should return an object with the expected properties/values", () => {
        expect(result.property1).to.equal("value1");
        expect(result.property2).to.equal(123);
        expect(result.property3).to.equal(false);
        expect(result.property4).to.equal(keyValuePairs[3].value);
      });
    });

    describe("When creating a dictionary from an array containing duplicate keys", () => {
      let keyValuePairs;

      beforeEach(() => {
        keyValuePairs = [
          { key: "property1", value: "value1" },
          { key: "property2", value: 123 },
          { key: "property3", value: false },
          { key: "property4", value: {} },
          { key: "property3", value: true }
        ];
      });

      it("It should throw an error", () => {
        expect(() => errors.createDictionary(keyValuePairs)).to.throw(
          Error,
          "You cannot provide duplicate keys"
        );
      });
    });
  });

  describe("Validating customers", () => {
    let validateCustomer, validCustomer, invalidCustomer;

    beforeEach(() => {
      validCustomer = {};
      invalidCustomer = {};
      validateCustomer = function(customer) {
        if (customer === validCustomer) {
          return true;
        } else {
          throw new Error("Customer details invalid");
        }
      };
    });

    describe("When validating a valid customer", () => {
      let validationResult;

      beforeEach(() => {
        validationResult = errors.isCustomerValid(
          validateCustomer,
          validCustomer
        );
      });

      it("It should return true", () => {
        expect(validationResult).to.be.true;
      });
    });

    describe("When validating a valid customer", () => {
      let validationResult;

      beforeEach(() => {
        validationResult = errors.isCustomerValid(
          validateCustomer,
          invalidCustomer
        );
      });

      it("It should return false", () => {
        expect(validationResult).to.be.false;
      });
    });
  });
});
