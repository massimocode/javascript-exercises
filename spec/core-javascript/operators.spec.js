'use strict';

let expect = require('chai').expect;
let operators = require('../../lib/core-javascript/operators');

describe('Operators', () => {
    describe('Assignment Chaining', () => {
        let object1, object2, returnedObject;
        beforeEach(() => {
            object1 = {};
            object2 = {};
            returnedObject = operators.assignmentChaining(object1, object2);
        });

        it('It should return an empty object', () => {
            expect(returnedObject).to.deep.equal({});
        });

        it('It should set object1.a to the returned object', () => {
            expect(object1.a).to.equal(returnedObject);
        });

        it('It should set object2.a to the returned object', () => {
            expect(object2.a).to.equal(returnedObject);
        });
    });

});