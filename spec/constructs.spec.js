'use strict';

let expect = require('chai').expect;
let constructs = require('../lib/constructs');
let utils = require('../utils');

describe('Constructs', () => {

    describe('Switch Statement', () => {

        describe('When getting the type of a day', () => {
            it('It should report null as Not a day', () => {
                expect(constructs.getTypeOfDay(null)).to.equal("Not a day");
            });

            it('It should report Monday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Monday")).to.equal("Weekday");
            });

            it('It should report Tuesday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Tuesday")).to.equal("Weekday");
            });

            it('It should report Wednesday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Wednesday")).to.equal("Weekday");
            });

            it('It should report Thursday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Thursday")).to.equal("Weekday");
            });

            it('It should report Friday as a Weekday', () => {
                expect(constructs.getTypeOfDay("Friday")).to.equal("Weekday");
            });

            it('It should report Saturday as a Weekend', () => {
                expect(constructs.getTypeOfDay("Saturday")).to.equal("Weekend");
            });

            it('It should report Sunday as a Weekend', () => {
                expect(constructs.getTypeOfDay("Sunday")).to.equal("Weekend");
            });

            it('It should report Something Else as Not a day', () => {
                expect(constructs.getTypeOfDay("Something Else")).to.equal("Not a day");
            });
        });

        describe('getTypeOfDay function', () => {
            it('It should contain a switch statement', () => {
                expect(constructs.getTypeOfDay.toString()).to.contain('switch');
            });

            it('It should not contain an if statement', () => {
                expect(constructs.getTypeOfDay.toString()).to.not.contain('if');
            });
        });
    });

    describe('Breaking out of nested loops', () => {

        describe('When getting the binary values', () => {

            describe('When a limit has not been specified (i.e. null)', () => {
                let counters;
                let result;

                beforeEach(() => {
                    counters = { i: 0, j: 0, k: 0 };
                    result = constructs.getBinaryValuesUpTo(null, counters);
                });

                it('It should report null as 000, 001, 010, 011, 100, 101, 110, 111', () => {
                    expect(result).to.equal("000, 001, 010, 011, 100, 101, 110, 111");
                });

                it('It should have iterated over the whole triple nested loop', () => {
                    expect(counters).to.deep.equal({ i: 2, j: 2, k: 2 });
                });
            });

            describe('When a limit of 011 has been specified', () => {
                let counters;
                let result;

                beforeEach(() => {
                    counters = { i: 0, j: 0, k: 0 };
                    result = constructs.getBinaryValuesUpTo('011', counters);
                });

                it('It should report null as 000, 001, 010, 011, 100, 101, 110, 111', () => {
                    expect(result).to.equal("000, 001, 010, 011");
                });

                it('It should have broken out of the triple nested loop', () => {
                    expect(counters).to.deep.equal({ i: 0, j: 1, k: 1 });
                });
            });
        });

        describe('getBinaryValuesUpTo function - additional challenges', () => {

            it('It should not contain any break statements', () => {
                expect(constructs.getBinaryValuesUpTo.toString()).to.not.contain('break');
            });

            it('It should not contain more than 1 return statement that returns a value', () => {
                var functionBody = utils.removeInstrumentation(constructs.getBinaryValuesUpTo.toString());
                console.log(functionBody);
                var numberOfReturnStatements = (functionBody.match(/return.*/g) || []).length;
                var numberOfReturnStatementsWithoutValue = (functionBody.match(/return\s*;?$/gm) || []).length;
                console.log(numberOfReturnStatements);
                console.log(numberOfReturnStatementsWithoutValue);
                expect(numberOfReturnStatements - numberOfReturnStatementsWithoutValue).to.equal(1);
            });
        });
    });
});