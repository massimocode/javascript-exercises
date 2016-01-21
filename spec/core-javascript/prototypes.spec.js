'use strict';

let prototypes = require('../../lib/core-javascript/prototypes');
let expect = require('chai').expect;
let sinon = require('sinon');
let utils = require('../../utils');

describe('Prototype', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Car prototype', () => {
        let carPrototypeBody;

        beforeEach(() => {
            // Execute prototype for Wallaby to rerun these tests when the body of the prototype is changed.
            new prototypes.Car();
            carPrototypeBody = utils.removeInstrumentation(prototypes.Car.toString());
        });

        it('It should not be an ES6 class', () => {
            expect(carPrototypeBody).to.not.contain('class');
        });
    });

    describe('When creating a Car', () => {
        let car;

        beforeEach(() => {
            car = new prototypes.Car();
        });

        it('It should create an instance of the Car prototype', () => {
            expect(car).to.be.an.instanceOf(prototypes.Car);
        });

        it('The accelerate method should be on the prototype', () => {
            expect(car.accelerate).to.equal(prototypes.Car.prototype.accelerate);
        });

        it('The getSpeed method should be on the prototype', () => {
            expect(car.getSpeed).to.equal(prototypes.Car.prototype.getSpeed);
        });

        it('It should have a speed of 100', () => {
            expect(car.getSpeed()).to.equal(100);
        });

        describe('When getting the type of the car', () => {
            let type;

            beforeEach(() => {
                type = prototypes.Car.getTypeOf(car);
            });

            it('It should return Car', () => {
                expect(type).to.equal('Car');
            });
        });

        describe('When accelerating', () => {
            beforeEach(() => {
                car.accelerate();
            });

            it('It should increase its speed to 110', () => {
                expect(car.getSpeed()).to.equal(110);
            });

            describe('When creating a second car', () => {
                let secondCar;

                beforeEach(() => {
                    secondCar = new prototypes.Car();
                });

                it('It should have a speed of 100', () => {
                    expect(secondCar.getSpeed()).to.equal(100);
                });
            });
        });
    });

    describe('SportsCar prototype', () => {
        let sportsCarPrototypeBody;

        beforeEach(() => {
            // Execute prototype for Wallaby to rerun these tests when the body of the prototype is changed.
            new prototypes.SportsCar();
            sportsCarPrototypeBody = utils.removeInstrumentation(prototypes.SportsCar.toString());
        });

        it('It should not be an ES6 class', () => {
            expect(sportsCarPrototypeBody).to.not.contain('class');
        });
    });

    describe('When creating a SportsCar', () => {
        let sportsCar;

        beforeEach(() => {
            sportsCar = new prototypes.SportsCar();
        });

        it('It should create an instance of the SportsCar prototype', () => {
            expect(sportsCar).to.be.an.instanceOf(prototypes.SportsCar);
        });

        it('It should derive from the Car prototype', () => {
            expect(sportsCar).to.be.an.instanceOf(prototypes.Car);
        });

        it('The accelerate method should be on the prototype', () => {
            expect(sportsCar.accelerate).to.equal(prototypes.SportsCar.prototype.accelerate);
        });

        it('The getSpeed method should be on the Car prototype', () => {
            expect(sportsCar.getSpeed).to.equal(prototypes.Car.prototype.getSpeed);
        });

        it('It should have a speed of 100', () => {
            expect(sportsCar.getSpeed()).to.equal(100);
        });

        describe('When getting the type of the sports car', () => {
            let type;

            beforeEach(() => {
                type = prototypes.Car.getTypeOf(sportsCar);
            });

            it('It should return SportsCar', () => {
                expect(type).to.equal('SportsCar');
            });
        });

        describe('When accelerating', () => {
            beforeEach(() => {
                sandbox.spy(prototypes.Car.prototype, 'accelerate');
                sportsCar.accelerate();
            });

            it('It should call the Car prototype\'s accelerate method', () => {
                expect(prototypes.Car.prototype.accelerate).to.have.been.calledOn(sportsCar);
            });

            it('It should increase its speed to 121', () => {
                expect(Math.floor(sportsCar.speed)).to.equal(121);
            });

            describe('When creating a second car', () => {
                let secondSportsCar;

                beforeEach(() => {
                    secondSportsCar = new prototypes.SportsCar();
                });

                it('It should have a speed of 100', () => {
                    expect(secondSportsCar.getSpeed()).to.equal(100);
                });
            });
        });
    });
});