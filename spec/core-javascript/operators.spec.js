"use strict";

let expect = require("chai").expect;
let operators = require("../../lib/core-javascript/operators");

describe("Operators", () => {
  describe("Assignment Chaining", () => {
    let object1, object2, returnedObject;
    beforeEach(() => {
      object1 = {};
      object2 = {};
      returnedObject = operators.assignmentChaining(object1, object2);
    });

    it("It should return an empty object", () => {
      expect(returnedObject).to.deep.equal({});
    });

    it("It should set object1.a to the returned object", () => {
      expect(object1.a).to.equal(returnedObject);
    });

    it("It should set object2.a to the returned object", () => {
      expect(object2.a).to.equal(returnedObject);
    });
  });

  describe("Ternary Operator", () => {
    describe("Returning the greater value - stage 1", () => {
      it("Given 1 and 2, it should return 2", () => {
        expect(operators.returnGreaterUsingTernaryStage1(1, 2)).to.equal(2);
      });

      it("Given 3 and -4, it should return 3", () => {
        expect(operators.returnGreaterUsingTernaryStage1(3, -4)).to.equal(3);
      });

      it("Given 3 and 3, it should return 3", () => {
        expect(operators.returnGreaterUsingTernaryStage1(3, 3)).to.equal(3);
      });
    });

    describe("Returning the greater value - stage 2", () => {
      it("Given 1 and 2, it should return 2", () => {
        expect(operators.returnGreaterUsingTernaryStage2(1, 2)).to.equal(2);
      });

      it("Given 3 and -4, it should return 3", () => {
        expect(operators.returnGreaterUsingTernaryStage2(3, -4)).to.equal(3);
      });

      it("Given 3 and 3, it should return null", () => {
        expect(operators.returnGreaterUsingTernaryStage2(3, 3)).to.be.null;
      });
    });
  });
});
