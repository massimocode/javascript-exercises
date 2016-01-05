'use strict';

let expect = require('chai').expect;
let utils = require('./utils');

describe('Utils', function () {

    describe('Remove instrumentation', function () {
        it('Given an example function, it should return the expected value', function () {
            let input = utils.exampleFunction.toString();
            let sanitised = utils.removeInstrumentation(input);
            let expected =
                `function exampleFunction(input) {
    console.log('Some line of code');
    if (true === false) {
        return;
    }
    return input.replace(new RegExp('', 'g'), '').replace(new RegExp('', 'g'), '');
}`;
            
            // For debugging
            // console.log('INPUT');
            // console.log(input);
            // console.log('SANITISED');
            // console.log(sanitised);
            // console.log('EXPECTED');
            // console.log(expected);

            expect(sanitised).to.equal(expected);
        });
    });
});