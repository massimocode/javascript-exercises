'use strict';

let expect = require('chai').expect;
let Calculator = require('../lib/calculator');

describe('Calculator', function () {

    describe('Given a new calculator', function () {
        let calculator;
        beforeEach(function () {
            calculator = new Calculator();
        });

        it('It should have a total of 0', function () {
            expect(calculator.getTotal()).to.equal(0);
        });

        describe('When adding 5', function () {
            beforeEach(function () {
                calculator.add(5);
            });

            it('It should have a total of 5', function () {
                expect(calculator.getTotal()).to.equal(5);
            });

            describe('When multiplying by 5', function () {
                beforeEach(function () {
                    calculator.multiply(5);
                });

                it('It should have a total of 25', function () {
                    expect(calculator.getTotal()).to.equal(25);
                });
            });

            describe('When dividing by 5', function () {
                beforeEach(function () {
                    calculator.divide(5);
                });

                it('It should have a total of 1', function () {
                    expect(calculator.getTotal()).to.equal(1);
                });
            });

            describe('When multiplied to the power of 3', function () {
                beforeEach(function () {
                    calculator.power(3);
                });

                it('It should have a total of 125', function () {
                    expect(calculator.getTotal()).to.equal(125);
                });
            });

            describe('When dividing by 0', function () {
                beforeEach(function () {
                    calculator.divide(0);
                });

                it('It should show an error', function () {
                    expect(calculator.getTotal()).to.equal('ERROR');
                });
            });

            describe('When clearing', function () {
                beforeEach(function () {
                    calculator.clear();
                });

                it('It should have a total of 0', function () {
                    expect(calculator.getTotal()).to.equal(0);
                });
            });
        });

        describe('When subtracting 7', function () {
            beforeEach(function () {
                calculator.subtract(7);
            });

            it('It should have a total of -7', function () {
                expect(calculator.getTotal()).to.equal(-7);
            });

            describe('When multiplying by 8', function () {
                beforeEach(function () {
                    calculator.multiply(8);
                });

                it('It should have a total of -56', function () {
                    expect(calculator.getTotal()).to.equal(-56);
                });
            });

            describe('When dividing by 2', function () {
                beforeEach(function () {
                    calculator.divide(2);
                });

                it('It should have a total of -3.5', function () {
                    expect(calculator.getTotal()).to.equal(-3.5);
                });
            });

            describe('When multiplied to the power of 3', function () {
                beforeEach(function () {
                    calculator.power(3);
                });

                it('It should have a total of -343', function () {
                    expect(calculator.getTotal()).to.equal(-343);
                });
            });

            describe('When dividing by 0', function () {
                beforeEach(function () {
                    calculator.divide(0);
                });

                it('It should show an error', function () {
                    expect(calculator.getTotal()).to.equal('ERROR');
                });
            });

            describe('When clearing', function () {
                beforeEach(function () {
                    calculator.clear();
                });

                it('It should have a total of 0', function () {
                    expect(calculator.getTotal()).to.equal(0);
                });
            });
        });

        describe('When dividing by 0', function () {
            beforeEach(function () {
                calculator.divide(0);
            });

            it('It should show an error', function () {
                expect(calculator.getTotal()).to.equal('ERROR');
            });

            describe('When clearing', function () {
                beforeEach(function () {
                    calculator.clear();
                });

                it('It should have a total of 0', function () {
                    expect(calculator.getTotal()).to.equal(0);
                });
            });
        });
    });
});