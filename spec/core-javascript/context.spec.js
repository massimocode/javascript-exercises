'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let context = require('../../lib/core-javascript/context');
let utils = require('../../utils');

describe('Context', () => {

    describe('Creating block scope', () => {

        describe('Getting 3 functions that return 1, 2, 3 respectively', () => {
            let functions;

            beforeEach(() => {
                functions = context.getFunctionsThatReturnNumbers(3);
            });

            it('It should return 3 functions', () => {
                expect(functions.length).to.equal(3);
            });

            it('The first function should return 1', () => {
                expect(functions[0]()).to.equal(1);
            });

            it('The second function should return 2', () => {
                expect(functions[1]()).to.equal(2);
            });

            it('The third function should return 3', () => {
                expect(functions[2]()).to.equal(3);
            });
        });

        describe('Getting 5 functions that return 1, 2, 3, 4, 5 respectively', () => {
            let functions;

            beforeEach(() => {
                functions = context.getFunctionsThatReturnNumbers(5);
            });

            it('It should return 5 functions', () => {
                expect(functions.length).to.equal(5);
            });

            it('The first function should return 1', () => {
                expect(functions[0]()).to.equal(1);
            });

            it('The second function should return 2', () => {
                expect(functions[1]()).to.equal(2);
            });

            it('The third function should return 3', () => {
                expect(functions[2]()).to.equal(3);
            });

            it('The fourth function should return 4', () => {
                expect(functions[3]()).to.equal(4);
            });

            it('The fifth function should return 5', () => {
                expect(functions[4]()).to.equal(5);
            });
        });

        describe('getFunctionsThatReturnNumbers function', () => {
            let functionBody;

            beforeEach(() => {
                // Execute function for Wallaby to rerun these tests when the body of the function is changed.
                context.getFunctionsThatReturnNumbers(1);
                functionBody = utils.removeInstrumentation(context.getFunctionsThatReturnNumbers.toString());
            });

            it('It should only contain the function keyword twice', () => {
                let numberOfFunctionKeywords = functionBody.match(/function/g).length;
                expect(numberOfFunctionKeywords).to.equal(2);
            });

            it('It should contain the let keyword', () => {
                expect(functionBody).to.contain('let');
            });
        });
    });

    describe('Creating block scope - the old fashioned way', () => {

        describe('Getting 3 functions that return 1, 2, 3 respectively', () => {
            let functions;

            beforeEach(() => {
                functions = context.getFunctionsThatReturnNumbersOldFashioned(3);
            });

            it('It should return 3 functions', () => {
                expect(functions.length).to.equal(3);
            });

            it('The first function should return 1', () => {
                expect(functions[0]()).to.equal(1);
            });

            it('The second function should return 2', () => {
                expect(functions[1]()).to.equal(2);
            });

            it('The third function should return 3', () => {
                expect(functions[2]()).to.equal(3);
            });
        });

        describe('Getting 5 functions that return 1, 2, 3, 4, 5 respectively', () => {
            let functions;

            beforeEach(() => {
                functions = context.getFunctionsThatReturnNumbersOldFashioned(5);
            });

            it('It should return 5 functions', () => {
                expect(functions.length).to.equal(5);
            });

            it('The first function should return 1', () => {
                expect(functions[0]()).to.equal(1);
            });

            it('The second function should return 2', () => {
                expect(functions[1]()).to.equal(2);
            });

            it('The third function should return 3', () => {
                expect(functions[2]()).to.equal(3);
            });

            it('The fourth function should return 4', () => {
                expect(functions[3]()).to.equal(4);
            });

            it('The fifth function should return 5', () => {
                expect(functions[4]()).to.equal(5);
            });
        });

        describe('getFunctionsThatReturnNumbersOldFashioned function', () => {
            let functionBody;

            beforeEach(() => {
                // Execute function for Wallaby to rerun these tests when the body of the function is changed.
                context.getFunctionsThatReturnNumbersOldFashioned(1);
                functionBody = utils.removeInstrumentation(context.getFunctionsThatReturnNumbersOldFashioned.toString());
            });

            it('It should not contain the let keyword', () => {
                expect(functionBody).to.not.contain('let');
            });
        });
    });

    describe('Context of this', () => {
        describe('When getting an item\'s current price', () => {
            it('It should return 12.99 for Heavily Used Vintage Shoes', () => {
                let getPrice = context.getCurrentPriceFunctionFor('Heavily Used Vintage Shoes');
                expect(getPrice()).to.equal(12.99);
            });

            it('It should return 24.99 for Maxxi Perforated Running Trainers', () => {
                let getPrice = context.getCurrentPriceFunctionFor('Maxxi Perforated Running Trainers');
                expect(getPrice()).to.equal(24.99);
            });

            it('It should return 12.99 for Some Unknown Product', () => {
                let getPrice = context.getCurrentPriceFunctionFor('Some Unknown Product');
                expect(getPrice).to.be.null;
            });
        });
    });

    describe('Constructors', () => {
        describe('When getting a Fire Breathing Dragon', () => {
            it('It should return a dragon with the correct name', () => {
                let dragon = context.getDragon('Fire Breathing');
                expect(dragon.name).to.equal('Fire Breathing Dragon');
            });
        });
        
        describe('When getting a Smelly Dragon', () => {
            it('It should return a dragon with the correct name', () => {
                let dragon = context.getDragon('Smelly');
                expect(dragon.name).to.equal('Smelly Dragon');
            });
        });
        
        describe('When getting a Baby Dragon', () => {
            it('It should return a dragon with the correct name', () => {
                let dragon = context.getDragon('Baby');
                expect(dragon.name).to.equal('Baby Dragon');
            });
        });
        
        describe('When getting a different kind of Dragon', () => {
            it('It should return a mysterious dragon', () => {
                let dragon = context.getDragon('Crazy');
                expect(dragon.name).to.equal('Mysterious Dragon');
            });
        });
    });
});
