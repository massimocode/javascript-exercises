'use strict';

let expect = require('chai').expect;
let functions = require('../../lib/core-javascript/functions');
let sinon = require('sinon');
let utils = require('../../utils');

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

        it('It should have only called the function once', () => {
            expect(spyFunction).to.have.been.calledOnce;
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

            it('It should have only called the function once', () => {
                expect(spyFunction).to.have.been.calledOnce;
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

            it('It should have only called the function once', () => {
                expect(spyFunction).to.have.been.calledOnce;
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
                    let rootNode = {
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
                    result = functions.countNodes(rootNode);
                });

                it('It should return 5', () => {
                    expect(result).to.equal(5);
                });
            });

            describe('Given a node graph containing 10 nodes', () => {
                let result;

                beforeEach(() => {
                    let rootNode = {
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
                    result = functions.countNodes(rootNode);
                });

                it('It should return 10', () => {
                    expect(result).to.equal(10);
                });
            });
        });

        describe('Counting nodes without recursion', () => {
            describe('Given a node graph containing 5 nodes', () => {
                let result;

                beforeEach(() => {
                    let rootNode = {
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
                    result = functions.countNodesWithoutFunctionRecursion(rootNode);
                });

                it('It should return 5', () => {
                    expect(result).to.equal(5);
                });
            });

            describe('Given a node graph containing 10 nodes', () => {
                let result;

                beforeEach(() => {
                    let rootNode = {
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
                    result = functions.countNodesWithoutFunctionRecursion(rootNode);
                });

                it('It should return 10', () => {
                    expect(result).to.equal(10);
                });
            });

            describe('Given a graph that is 100000 nodes deep', () => {
                let result;

                beforeEach(() => {
                    let rootNode = { nodes: [] };
                    let currentNode = rootNode;
                    for (let i = 1; i < 100000; i++) {
                        let newNode = { nodes: [] };
                        currentNode.nodes.push(newNode);
                        currentNode = newNode;
                    }
                    result = functions.countNodesWithoutFunctionRecursion(rootNode);
                });

                it('It should return 100000', () => {
                    expect(result).to.equal(100000);
                });
            });

            describe('The function', () => {
                let functionBody;

                beforeEach(() => {
                    // Execute function for Wallaby to rerun these tests when the body of the function is changed.
                    functions.countNodesWithoutFunctionRecursion({ nodes: [], action: () => { } });
                    functionBody = utils.removeInstrumentation(functions.countNodesWithoutFunctionRecursion.toString());
                });

                it('It should not call itself', () => {
                    let numberOfTimesFunctionNameUsed = functionBody.match(/countNodesWithoutFunctionRecursion/g);
                    expect((numberOfTimesFunctionNameUsed || []).length).to.equal(1);
                });
            });
        });

        describe('Recursively executing a node graph of functions in reverse order', () => {

            describe('Given a graph of 5 nodes', () => {
                let function1, function2, function3, function4, function5, rootNode, functionCallOrder;

                beforeEach(() => {
                    functionCallOrder = [];
                    function1 = sinon.spy(() => functionCallOrder.push('function1'));
                    function2 = sinon.spy(() => functionCallOrder.push('function2'));
                    function3 = sinon.spy(() => functionCallOrder.push('function3'));
                    function4 = sinon.spy(() => functionCallOrder.push('function4'));
                    function5 = sinon.spy(() => functionCallOrder.push('function5'));
                    rootNode = {
                        action: function1,
                        nodes: [
                            { action: function2, nodes: [] },
                            {
                                action: function3,
                                nodes: [
                                    { action: function4, nodes: [] },
                                    { action: function5, nodes: [] }
                                ]
                            }
                        ]
                    };
                    functions.executeFunctionsInReverseOrderAndReverseDepth(rootNode);
                });

                it('It should execute the 1st function', () => {
                    expect(function1).to.have.been.called;
                });

                it('It should execute the 2nd function', () => {
                    expect(function2).to.have.been.called;
                });

                it('It should execute the 3rd function', () => {
                    expect(function3).to.have.been.called;
                });

                it('It should execute the 4th function', () => {
                    expect(function4).to.have.been.called;
                });

                it('It should execute the 5th function', () => {
                    expect(function5).to.have.been.called;
                });

                it('It should not reverse the order of the nodes', () => {
                    expect(rootNode.nodes[0].action).to.equal(function2);
                    expect(rootNode.nodes[1].action).to.equal(function3);
                    expect(rootNode.nodes[1].nodes[0].action).to.equal(function4);
                    expect(rootNode.nodes[1].nodes[1].action).to.equal(function5);
                });

                it('It should execute the functions in the given order', () => {
                    expect(functionCallOrder[0]).to.equal('function5');
                    expect(functionCallOrder[1]).to.equal('function4');
                    expect(functionCallOrder[2]).to.equal('function3');
                    expect(functionCallOrder[3]).to.equal('function2');
                    expect(functionCallOrder[4]).to.equal('function1');
                });
            });
        });
    });
});