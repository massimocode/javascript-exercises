"use strict";

let scheduling = require("../../lib/core-javascript/scheduling");
let expect = require("chai").expect;
let sinon = require("sinon");

describe("Delays", () => {
  describe("When requesting that a function executes after 1 second", () => {
    let clock, functionToExecuteSpy;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      functionToExecuteSpy = sinon.spy();
      scheduling.executeAfter1Second(functionToExecuteSpy);
    });

    afterEach(() => {
      clock.restore();
    });

    it("It should not execute the function immediately", () => {
      expect(functionToExecuteSpy).not.to.have.been.called;
    });

    it("It should execute the function after 1 second", () => {
      clock.tick(1000);
      expect(functionToExecuteSpy).to.have.been.called;
    });
  });
});
