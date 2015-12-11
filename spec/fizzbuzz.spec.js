'use strict';

let fizzbuzz = require('../lib/fizzbuzz');

describe('FizzBuzz', function () {

    describe('Word Exercises', function () {
        it('Given afba it should return afba', function () {
            expect(fizzbuzz.word('afba')).to.equal('afba');
        });

        it('Given ABFA it should return ABFA', function () {
            expect(fizzbuzz.word('ABFA')).to.equal('ABFA');
        });

        it('Given foo it should return fizz', function () {
            expect(fizzbuzz.word('foo')).to.equal('fizz');
        });

        it('Given FOO it should return fizz', function () {
            expect(fizzbuzz.word('FOO')).to.equal('fizz');
        });

        it('Given cab it should return buzz', function () {
            expect(fizzbuzz.word('cab')).to.equal('buzz');
        });

        it('Given CAB it should return buzz', function () {
            expect(fizzbuzz.word('CAB')).to.equal('buzz');
        });

        it('Given fab it should return fizzbuzz', function () {
            expect(fizzbuzz.word('fab')).to.equal('fizzbuzz');
        });

        it('Given Fab it should return fizzbuzz', function () {
            expect(fizzbuzz.word('Fab')).to.equal('fizzbuzz');
        });

        it('Given faB it should return fizzbuzz', function () {
            expect(fizzbuzz.word('faB')).to.equal('fizzbuzz');
        });

        it('Given FAB it should return fizzbuzz', function () {
            expect(fizzbuzz.word('FAB')).to.equal('fizzbuzz');
        });
    });

    describe('Number exercises', function () {
        it('Given 1,1 it should return ["1"]', function () {
            expect(fizzbuzz.numbers(1, 1)).to.deep.equal(['1']);
        });

        it('Given 1,2 it should return ["1", "2"]', function () {
            expect(fizzbuzz.numbers(1, 2)).to.deep.equal(['1', '2']);
        });

        it('Given 1,3 it should return ["1","2","fizz"]', function () {
            expect(fizzbuzz.numbers(1, 3)).to.deep.equal(['1', '2', 'fizz']);
        });

        it('Given 1,5 it should return ["1","2","fizz","4","buzz"]', function () {
            expect(fizzbuzz.numbers(1, 5)).to.deep.equal(['1', '2', 'fizz', '4', 'buzz']);
        });

        it('Given 1,15 it should return ["1","2","fizz","4","buzz","fizz","7","8","fizz","buzz","11","fizz","13","14","fizzbuzz"]', function () {
            expect(fizzbuzz.numbers(1, 15)).to.deep.equal(["1", "2", "fizz", "4", "buzz", "fizz", "7", "8", "fizz", "buzz", "11", "fizz", "13", "14", "fizzbuzz"]);
        });

        it('Given 0,0 it should return ["fizzbuzz"]', function () {
            expect(fizzbuzz.numbers(0, 0)).to.deep.equal(['fizzbuzz']);
        });
    });

});