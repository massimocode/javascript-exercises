'use strict';

let expect = require('chai').expect;
let functions = require('../../lib/core-javascript/functions');
let sinon = require('sinon');

describe('Functions', function () {

    describe('Return 123', function () {
        it('Should return 123', function () {
            expect(functions.return123()).to.equal(123);
        });
    });

    describe('Return the given value', function () {
        it('Given 123, should return 123', function () {
            var result = functions.returnGivenValue(123);
            expect(result).to.equal(123);
        });

        it('Given an object, should return the given object', function () {
            var input = {};
            var result = functions.returnGivenValue(input);
            expect(result).to.equal(input);
        });

        it('Given "abc", should return "abc"', function () {
            var result = functions.returnGivenValue("abc");
            expect(result).to.equal("abc");
        });
    });

    describe('Get function that returns 123', function () {
        it('Should return a function that returns 123', function () {
            var result = functions.getFunctionThatReturns123();
            expect(result()).to.equal(123);
        });
    });

    describe('Get function that returns the given value', function () {

        it('Given 123, should return a function that returns 123', function () {
            var result = functions.getFunctionThatReturnsTheGivenValue(123);
            expect(result()).to.equal(123);
        });

        it('Given "abc", should return a function that returns "abc"', function () {
            var result = functions.getFunctionThatReturnsTheGivenValue("abc");
            expect(result()).to.equal("abc");
        });

        it('Given an object, should return a function that returns the given object', function () {
            var objectToReturn = {};
            var result = functions.getFunctionThatReturnsTheGivenValue(objectToReturn);
            expect(result()).to.equal(objectToReturn);
        });
    });

    describe('Currying', function () {
        let curriedFunction;

        describe('With an initial value of 2', function () {
            beforeEach(function () {
                curriedFunction = functions.curriedAdd(2);
            });

            it('It should return a function that returns the input plus 2', function () {
                expect(curriedFunction(2)).to.equal(4);
            });
        });

        describe('With an initial value of -4', function () {
            beforeEach(function () {
                curriedFunction = functions.curriedAdd(-4);
            });

            it('It should return a function that returns the input minus 4', function () {
                expect(curriedFunction(2)).to.equal(-2);
            });
        });

        describe('With an initial value of "Hello "', function () {
            beforeEach(function () {
                curriedFunction = functions.curriedAdd("Hello ");
            });

            it('It should return a function that returns the input prefixed by "Hello "', function () {
                expect(curriedFunction("World!")).to.equal("Hello World!");
            });
        });
    });

    describe('Counter', function () {
        let counter;

        describe('When a start value is not provided', function () {
            beforeEach(function () {
                counter = functions.counter();
            });

            it('It should count as expected', function () {
                expect(counter()).to.equal(1);
                expect(counter()).to.equal(2);
                expect(counter()).to.equal(3);
                expect(counter()).to.equal(4);
                expect(counter()).to.equal(5);
            });
        });

        describe('When a start value is provided', function () {
            beforeEach(function () {
                counter = functions.counter(5);
            });

            it('It should count as expected', function () {
                expect(counter()).to.equal(5);
                expect(counter()).to.equal(6);
                expect(counter()).to.equal(7);
                expect(counter()).to.equal(8);
                expect(counter()).to.equal(9);
            });
        });
    });

    describe('Applying functions', () => {
        describe('Converting arguments to a real array', () => {
            let arg1, arg2, arg3, result;
            beforeEach(() => {
                arg1 = {};
                arg2 = 'Hello';
                arg3 = 123;
                result = functions.returnArgumentsAsRealArrayUsingApply(arg1, arg2, arg3);
            });

            it('It should return the arguments as a real array', () => {
                expect(result).to.deep.equal([arg1, arg2, arg3]);
            });
        });
    });

    describe('Calling functions', () => {
        describe('Converting arguments to a real array', () => {
            let arg1, arg2, arg3, result;
            beforeEach(() => {
                arg1 = {};
                arg2 = 'Hello';
                arg3 = 123;
                result = functions.returnArgumentsAsRealArrayUsingCall(arg1, arg2, arg3);
            });

            it('It should return the arguments as a real array', () => {
                expect(result).to.deep.equal([arg1, arg2, arg3]);
            });
        });
    });

    describe('Invoking a function with context and arguments', () => {

        describe('Given 3 arguments', () => {
            let spyFunction, context, arg1, arg2, arg3;

            beforeEach(() => {
                spyFunction = sinon.spy(function () { });
                context = {};
                arg1 = { id: 1 };
                arg2 = { id: 2 };
                arg3 = { id: 3 };
                functions.callGivenFunctionWithGivenContextAndArguments(spyFunction, context, arg1, arg2, arg3);
            });

            it('It should call the supplied function with the given context', () => {
                expect(spyFunction).to.have.been.calledOn(context);
            });

            it('It should call the supplied function with the given arguments', () => {
                expect(spyFunction).to.have.been.calledWithExactly(arg1, arg2, arg3);
            });
        });

        describe('Given 5 arguments', () => {
            let spyFunction, context, arg1, arg2, arg3, arg4, arg5;

            beforeEach(() => {
                spyFunction = sinon.spy(function () { });
                context = {};
                arg1 = { id: 1 };
                arg2 = { id: 2 };
                arg3 = { id: 3 };
                arg4 = { id: 4 };
                arg5 = { id: 5 };
                functions.callGivenFunctionWithGivenContextAndArguments(spyFunction, context, arg1, arg2, arg3, arg4, arg5);
            });

            it('It should call the supplied function with the given context', () => {
                expect(spyFunction).to.have.been.calledOn(context);
            });

            it('It should call the supplied function with the given arguments', () => {
                expect(spyFunction).to.have.been.calledWithExactly(arg1, arg2, arg3, arg4, arg5);
            });
        });
    });

    describe('Returning a function with context and a bound argument and calling it', () => {
        let spyFunction, context, argument;

        beforeEach(() => {
            spyFunction = sinon.spy();
            context = {};
            argument = { id: 1 };
            let returnedFunction = functions.returnAFunctionThatIsBoundToTheGivenContextAndArgument(spyFunction, context, argument);
            returnedFunction();
        });

        it('It should call the supplied function with the given context', () => {
            expect(spyFunction).to.have.been.calledOn(context);
        });

        it('It should call the supplied function with the given arguments', () => {
            expect(spyFunction).to.have.been.calledWithExactly(argument);
        });
    });

    describe('Returning a function with context and several bound arguments and calling it', () => {

        describe('Given 3 arguments', () => {
            let spyFunction, context, arg1, arg2, arg3;

            beforeEach(() => {
                spyFunction = sinon.spy(function () { });
                context = {};
                arg1 = { id: 1 };
                arg2 = { id: 2 };
                arg3 = { id: 3 };
                let returnedFunction = functions.returnAFunctionThatIsBoundToTheGivenContextAndArguments(spyFunction, context, arg1, arg2, arg3);
                returnedFunction();
            });

            it('It should call the supplied function with the given context', () => {
                expect(spyFunction).to.have.been.calledOn(context);
            });

            it('It should call the supplied function with the given arguments', () => {
                expect(spyFunction).to.have.been.calledWithExactly(arg1, arg2, arg3);
            });
        });

        describe('Given 5 arguments', () => {
            let spyFunction, context, arg1, arg2, arg3, arg4, arg5;

            beforeEach(() => {
                spyFunction = sinon.spy(function () { });
                context = {};
                arg1 = { id: 1 };
                arg2 = { id: 2 };
                arg3 = { id: 3 };
                arg4 = { id: 4 };
                arg5 = { id: 5 };
                let returnedFunction = functions.returnAFunctionThatIsBoundToTheGivenContextAndArguments(spyFunction, context, arg1, arg2, arg3, arg4, arg5);
                returnedFunction();
            });

            it('It should call the supplied function with the given context', () => {
                expect(spyFunction).to.have.been.calledOn(context);
            });

            it('It should call the supplied function with the given arguments', () => {
                expect(spyFunction).to.have.been.calledWithExactly(arg1, arg2, arg3, arg4, arg5);
            });
        });
    });

    describe('Recursion', () => {
        describe('Recursively counting nodes', () => {
            describe('Given a node graph containing 5 nodes', () => {
                let result;

                beforeEach(() => {
                    let nodeGraph = {
                        nodes: [
                            {
                                nodes: [
                                    { nodes: [] },
                                    { nodes: [] },
                                    { nodes: [] }
                                ]
                            }
                        ]
                    };
                    result = functions.countNodes(nodeGraph);
                });

                it('It should return 5', () => {
                    expect(result).to.equal(5);
                });
            });
            
            describe('Given a node graph containing 10 nodes', () => {
                let result;

                beforeEach(() => {
                    let nodeGraph = {
                        nodes: [
                            {
                                nodes: [
                                    { nodes: [] },
                                    { nodes: [] },
                                    { nodes: [] }
                                ]
                            },
                            {
                                nodes: [
                                    { nodes: [] },
                                    { nodes: [
                                        { nodes: [] },
                                        { nodes: [] }
                                    ]
                                    }
                                ]
                            }
                        ]
                    };
                    result = functions.countNodes(nodeGraph);
                });

                it('It should return 10', () => {
                    expect(result).to.equal(10);
                });
            });
        });
    });
});