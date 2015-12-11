'use strict';

let leapyear = require('../lib/leapyear');

describe('Leap Year', function () {

	describe('Is Leap Year', function () {
		it('Given 0 it should return true', function () {
			expect(leapyear.isLeapYear(0)).to.be.true;
		});

		it('Given 1 it should return false', function () {
			expect(leapyear.isLeapYear(1)).to.be.false;
		});

		it('Given 4 it should return true', function () {
			expect(leapyear.isLeapYear(4)).to.be.true;
		});

		it('Given 100 it should return false', function () {
			expect(leapyear.isLeapYear(100)).to.be.false;
		});

		it('Given 400 it should return true', function () {
			expect(leapyear.isLeapYear(400)).to.be.true;
		});

		it('Given 1000 it should return false', function () {
			expect(leapyear.isLeapYear(1000)).to.be.false;
		});

		it('Given 2000 it should return true', function () {
			expect(leapyear.isLeapYear(2000)).to.be.true;
		});
	});

	describe('Get Leap Years', function () {
		it('Given 0,4 it should return [0,4]', function () {
			expect(leapyear.getLeapYears(0, 4)).to.deep.equal([0, 4]);
		});

		it('Given 1,2 it should return []', function () {
			expect(leapyear.getLeapYears(1, 2)).to.deep.equal([]);
		});

		it('Given 80,120 it should return [80,84,88,92,96,104,108,112,116,120]', function () {
			expect(leapyear.getLeapYears(80, 120)).to.deep.equal([80, 84, 88, 92, 96, 104, 108, 112, 116, 120]);
		});
	});

});