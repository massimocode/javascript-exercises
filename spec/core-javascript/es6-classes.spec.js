"use strict";

let classes = require("../../lib/core-javascript/es6-classes");
let expect = require("chai").expect;
let sinon = require("sinon");
let utils = require("../../utils");

describe("ES6 Classes", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Car class", () => {
    let carClassBody;

    beforeEach(() => {
      // Execute prototype for Wallaby to rerun these tests when the body of the prototype is changed.
      new classes.Car();
      carClassBody = utils.removeInstrumentation(classes.Car.toString());
    });

    it("It should be an ES6 class", () => {
      expect(carClassBody.startsWith("class")).to.be.true;
    });
  });

  describe("When creating a Car", () => {
    let car;

    beforeEach(() => {
      car = new classes.Car();
    });

    it("It should create an instance of the Car prototype", () => {
      expect(car).to.be.an.instanceOf(classes.Car);
    });

    it("The accelerate method should be on the prototype", () => {
      expect(car.accelerate).to.equal(classes.Car.prototype.accelerate);
    });

    it("The getSpeed method should be on the prototype", () => {
      expect(car.getSpeed).to.equal(classes.Car.prototype.getSpeed);
    });

    it("It should have a speed of 100", () => {
      expect(car.getSpeed()).to.equal(100);
    });

    describe("When getting the type of the car", () => {
      let type;

      beforeEach(() => {
        type = classes.Car.getTypeOf(car);
      });

      it("It should return Car", () => {
        expect(type).to.equal("Car");
      });
    });

    describe("When accelerating", () => {
      beforeEach(() => {
        car.accelerate();
      });

      it("It should increase its speed to 110", () => {
        expect(car.getSpeed()).to.equal(110);
      });

      describe("When creating a second car", () => {
        let secondCar;

        beforeEach(() => {
          secondCar = new classes.Car();
        });

        it("It should have a speed of 100", () => {
          expect(secondCar.getSpeed()).to.equal(100);
        });
      });
    });
  });

  describe("SportsCar class", () => {
    let sportsCarClassBody;

    beforeEach(() => {
      // Execute prototype for Wallaby to rerun these tests when the body of the prototype is changed.
      new classes.SportsCar();
      sportsCarClassBody = utils.removeInstrumentation(
        classes.SportsCar.toString()
      );
    });

    it("It should be an ES6 class", () => {
      expect(sportsCarClassBody.startsWith("class")).to.be.true;
    });
  });

  describe("When creating a SportsCar", () => {
    let sportsCar;

    beforeEach(() => {
      sportsCar = new classes.SportsCar();
    });

    it("It should create an instance of the SportsCar prototype", () => {
      expect(sportsCar).to.be.an.instanceOf(classes.SportsCar);
    });

    it("It should derive from the Car prototype", () => {
      expect(sportsCar).to.be.an.instanceOf(classes.Car);
    });

    it("The accelerate method should be on the prototype", () => {
      expect(sportsCar.accelerate).to.equal(
        classes.SportsCar.prototype.accelerate
      );
    });

    it("The getSpeed method should be on the Car prototype", () => {
      expect(sportsCar.getSpeed).to.equal(classes.Car.prototype.getSpeed);
    });

    it("It should have a speed of 100", () => {
      expect(sportsCar.getSpeed()).to.equal(100);
    });

    describe("When getting the type of the sports car", () => {
      let type;

      beforeEach(() => {
        type = classes.Car.getTypeOf(sportsCar);
      });

      it("It should return SportsCar", () => {
        expect(type).to.equal("SportsCar");
      });
    });

    describe("When accelerating", () => {
      beforeEach(() => {
        sandbox.spy(classes.Car.prototype, "accelerate");
        sportsCar.accelerate();
      });

      it("It should call the Car prototype's accelerate method", () => {
        expect(classes.Car.prototype.accelerate).to.have.been.calledOn(
          sportsCar
        );
      });

      it("It should increase its speed to 121", () => {
        expect(Math.floor(sportsCar.speed)).to.equal(121);
      });

      describe("When creating a second car", () => {
        let secondSportsCar;

        beforeEach(() => {
          secondSportsCar = new classes.SportsCar();
        });

        it("It should have a speed of 100", () => {
          expect(secondSportsCar.getSpeed()).to.equal(100);
        });
      });
    });
  });
});
