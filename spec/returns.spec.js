'use strict';

let returns = require('../lib/returns');

describe('Returns', function () {

    describe('Return First Argument', function () {
        it('Given 1, 2, 3 it should return 1', function () {
            expect(returns.returnFirstArgument(1, 2, 3)).to.equal(1);
        });
        
        it('Given "a", "b", "c" it should return "a"', function () {
            expect(returns.returnFirstArgument("a", "b", "c")).to.equal("a");
        });
        
        it('Given three objects, it should return the first object', function () {
            let arg1 = {}, arg2 = {}, arg3 = {}; 
            expect(returns.returnFirstArgument(arg1, arg2, arg3)).to.equal(arg1);
        });
    });

    describe('Return Second Argument', function () {
        it('Given 1, 2, 3 it should return 2', function () {
            expect(returns.returnSecondArgument(1, 2, 3)).to.equal(2);
        });
        
        it('Given "a", "b", "c" it should return "b"', function () {
            expect(returns.returnSecondArgument("a", "b", "c")).to.equal("b");
        });
        
        it('Given three objects, it should return the second object', function () {
            let arg1 = {}, arg2 = {}, arg3 = {}; 
            expect(returns.returnSecondArgument(arg1, arg2, arg3)).to.equal(arg2);
        });
    });

    describe('Return Third Argument', function () {
        it('Given 1, 2, 3 it should return 3', function () {
            expect(returns.returnThirdArgument(1, 2, 3)).to.equal(3);
        });
        
        it('Given "a", "b", "c" it should return "c"', function () {
            expect(returns.returnThirdArgument("a", "b", "c")).to.equal("c");
        });
        
        it('Given three objects, it should return the third object', function () {
            let arg1 = {}, arg2 = {}, arg3 = {}; 
            expect(returns.returnThirdArgument(arg1, arg2, arg3)).to.equal(arg3);
        });
    });

    describe('Return Nth Argument', function () {
        it('Given 1, 1, 2, 3 it should return 1', function () {
            expect(returns.returnNthArgument(1, 1, 2, 3)).to.equal(1);
        });
        
        it('Given 2, "a", "b", "c" it should return "b"', function () {
            expect(returns.returnNthArgument(2, "a", "b", "c")).to.equal("b");
        });
        
        it('Given 3, followed by three objects, it should return the third object', function () {
            let arg1 = {}, arg2 = {}, arg3 = {}; 
            expect(returns.returnNthArgument(3, arg1, arg2, arg3)).to.equal(arg3);
        });
    });

    describe('Return arguments flipped', function () {
        it('Given 1, 2, 3 it should return [3, 2, 1]', function () {
            expect(returns.returnArgumentsFlipped(1, 2, 3)).to.deep.equal([3, 2, 1]);
        });
        
        it('Given "a", "b", "c", "d" it should return ["d", c", "b", "a"]', function () {
            expect(returns.returnArgumentsFlipped("a", "b", "c", "d")).to.deep.equal(["d", "c", "b", "a"]);
        });
        
        it('Given three objects, it should return them in reverse order', function () {
            let arg1 = {}, arg2 = {}, arg3 = {}, arg4 = {}, arg5 = {}; 
            expect(returns.returnArgumentsFlipped(arg1, arg2, arg3, arg4, arg5)).to.deep.equal([arg5, arg4, arg3, arg2, arg1]);
        });
    });

    describe('Return Nth Element of Array', function () {
        it('Given 1, [1, 2, 3] it should return 1', function () {
            expect(returns.returnNthElement(1, [1, 2, 3])).to.equal(1);
        });
        
        it('Given 2, ["a", "b", "c"] it should return "c"', function () {
            expect(returns.returnNthElement(2, ["a", "b", "c"])).to.equal("b");
        });
        
        it('Given 3, followed by three objects, it should return the third object', function () {
            let obj1 = {}, obj2 = {}, obj3 = {}; 
            expect(returns.returnNthElement(3, [obj1, obj2, obj3])).to.equal(obj3);
        });
    });

});