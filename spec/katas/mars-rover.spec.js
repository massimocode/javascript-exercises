'use strict';

let expect = require('chai').expect;
let MarsRover = require('../../lib/katas/mars-rover');

describe('Mars Rover', function () {

    describe('Given a new Mars Rover with no obstacles and no bounds', function () {
        let marsRover;
        beforeEach(function () {
            marsRover = new MarsRover();
        });

        describe('Single basic commands', function () {

            it('Its position should be 0, 0, N', function () {
                expect(marsRover.getPosition()).to.equal("0, 0, N");
            });

            describe('When moving forward', function () {
                beforeEach(function () {
                    marsRover.command('F');
                });

                it('Its position should be 0, 1, N', function () {
                    expect(marsRover.getPosition()).to.equal("0, 1, N");
                });
            });

            describe('When moving backward', function () {
                beforeEach(function () {
                    marsRover.command('B');
                });

                it('Its position should be 0, -1, N', function () {
                    expect(marsRover.getPosition()).to.equal("0, -1, N");
                });
            });

            describe('When turning right', function () {
                beforeEach(function () {
                    marsRover.command('R');
                });

                it('Its position should be 0, 0, E', function () {
                    expect(marsRover.getPosition()).to.equal("0, 0, E");
                });

                describe('When moving forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('Its position should be 1, 0, E', function () {
                        expect(marsRover.getPosition()).to.equal("1, 0, E");
                    });
                });

                describe('When moving backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('Its position should be -1, 0, E', function () {
                        expect(marsRover.getPosition()).to.equal("-1, 0, E");
                    });
                });

                describe('When turning right a second time', function () {
                    beforeEach(function () {
                        marsRover.command('R');
                    });

                    it('Its position should be 0, 0, S', function () {
                        expect(marsRover.getPosition()).to.equal("0, 0, S");
                    });

                    describe('When moving forward', function () {
                        beforeEach(function () {
                            marsRover.command('F');
                        });

                        it('Its position should be 0, -1, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, -1, S");
                        });
                    });

                    describe('When moving backward', function () {
                        beforeEach(function () {
                            marsRover.command('B');
                        });

                        it('Its position should be 0, 1, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, 1, S");
                        });
                    });

                    describe('When turning right a third time', function () {
                        beforeEach(function () {
                            marsRover.command('R');
                        });

                        it('Its position should be 0, 0, W', function () {
                            expect(marsRover.getPosition()).to.equal("0, 0, W");
                        });

                        describe('When moving forward', function () {
                            beforeEach(function () {
                                marsRover.command('F');
                            });

                            it('Its position should be -1, 0, W', function () {
                                expect(marsRover.getPosition()).to.equal("-1, 0, W");
                            });
                        });

                        describe('When moving backward', function () {
                            beforeEach(function () {
                                marsRover.command('B');
                            });

                            it('Its position should be 1, 0, W', function () {
                                expect(marsRover.getPosition()).to.equal("1, 0, W");
                            });
                        });

                        describe('When turning right a fourth time', function () {
                            beforeEach(function () {
                                marsRover.command('R');
                            });

                            it('Its position should be 0, 0, N', function () {
                                expect(marsRover.getPosition()).to.equal("0, 0, N");
                            });

                            describe('When moving forward', function () {
                                beforeEach(function () {
                                    marsRover.command('F');
                                });

                                it('Its position should be 0, 1, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, 1, N");
                                });
                            });

                            describe('When moving backward', function () {
                                beforeEach(function () {
                                    marsRover.command('B');
                                });

                                it('Its position should be 0, -1, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, -1, N");
                                });
                            });
                        });
                    });
                });
            });

            describe('When turning left', function () {
                beforeEach(function () {
                    marsRover.command('L');
                });

                it('Its position should be 0, 0, W', function () {
                    expect(marsRover.getPosition()).to.equal("0, 0, W");
                });

                describe('When moving forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('Its position should be -1, 0, W', function () {
                        expect(marsRover.getPosition()).to.equal("-1, 0, W");
                    });
                });

                describe('When moving backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('Its position should be 1, 0, W', function () {
                        expect(marsRover.getPosition()).to.equal("1, 0, W");
                    });
                });

                describe('When turning left a second time', function () {
                    beforeEach(function () {
                        marsRover.command('L');
                    });

                    it('Its position should be 0, 0, S', function () {
                        expect(marsRover.getPosition()).to.equal("0, 0, S");
                    });

                    describe('When moving forward', function () {
                        beforeEach(function () {
                            marsRover.command('F');
                        });

                        it('Its position should be 0, -1, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, -1, S");
                        });
                    });

                    describe('When moving backward', function () {
                        beforeEach(function () {
                            marsRover.command('B');
                        });

                        it('Its position should be 0, 1, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, 1, S");
                        });
                    });

                    describe('When turning left a third time', function () {
                        beforeEach(function () {
                            marsRover.command('L');
                        });

                        it('Its position should be 0, 0, E', function () {
                            expect(marsRover.getPosition()).to.equal("0, 0, E");
                        });

                        describe('When moving forward', function () {
                            beforeEach(function () {
                                marsRover.command('F');
                            });

                            it('Its position should be 1, 0, E', function () {
                                expect(marsRover.getPosition()).to.equal("1, 0, E");
                            });
                        });

                        describe('When moving backward', function () {
                            beforeEach(function () {
                                marsRover.command('B');
                            });

                            it('Its position should be -1, 0, E', function () {
                                expect(marsRover.getPosition()).to.equal("-1, 0, E");
                            });
                        });

                        describe('When turning left a fourth time', function () {
                            beforeEach(function () {
                                marsRover.command('L');
                            });

                            it('Its position should be 0, 0, N', function () {
                                expect(marsRover.getPosition()).to.equal("0, 0, N");
                            });

                            describe('When moving forward', function () {
                                beforeEach(function () {
                                    marsRover.command('F');
                                });

                                it('Its position should be 0, 1, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, 1, N");
                                });
                            });

                            describe('When moving backward', function () {
                                beforeEach(function () {
                                    marsRover.command('B');
                                });

                                it('Its position should be 0, -1, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, -1, N");
                                });
                            });
                        });
                    });
                });
            });
        });

        describe('Multiple movements', function () {
            describe('When moving forwards twice, turning right once, and moving forwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('F');
                    marsRover.command('F');
                    marsRover.command('R');
                    marsRover.command('F');
                    marsRover.command('F');
                });

                it('Its position should be 2, 2, E', function () {
                    expect(marsRover.getPosition()).to.equal("2, 2, E");
                });
            });

            describe('When moving backwards twice, turning left once, and moving backwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('B');
                    marsRover.command('B');
                    marsRover.command('L');
                    marsRover.command('B');
                    marsRover.command('B');
                });

                it('Its position should be 2, -2, W', function () {
                    expect(marsRover.getPosition()).to.equal("2, -2, W");
                });
            });
        });

        describe('Multiple commands', function () {
            describe('When moving forwards twice, turning right once, and moving forwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('FFRFF');
                });

                it('Its position should be 2, 2, E', function () {
                    expect(marsRover.getPosition()).to.equal("2, 2, E");
                });
            });

            describe('When moving backwards twice, turning left once, and moving backwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('BBLBB');
                });

                it('Its position should be 2, -2, W', function () {
                    expect(marsRover.getPosition()).to.equal("2, -2, W");
                });
            });
        });
    });

    describe('Given a new Mars Rover with no obstacles, but with bounds', function () {
        let marsRover;
        beforeEach(function () {
            marsRover = new MarsRover(null, 5, 10);
        });

        describe('Single basic commands', function () {

            it('Its position should be 0, 0, N', function () {
                expect(marsRover.getPosition()).to.equal("0, 0, N");
            });

            describe('When moving forward', function () {
                beforeEach(function () {
                    marsRover.command('F');
                });

                it('Its position should be 0, 1, N', function () {
                    expect(marsRover.getPosition()).to.equal("0, 1, N");
                });
            });

            describe('When moving backward', function () {
                beforeEach(function () {
                    marsRover.command('B');
                });

                it('Its position should be 0, 9, N', function () {
                    expect(marsRover.getPosition()).to.equal("0, 9, N");
                });
            });

            describe('When turning right', function () {
                beforeEach(function () {
                    marsRover.command('R');
                });

                it('Its position should be 0, 0, E', function () {
                    expect(marsRover.getPosition()).to.equal("0, 0, E");
                });

                describe('When moving forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('Its position should be 1, 0, E', function () {
                        expect(marsRover.getPosition()).to.equal("1, 0, E");
                    });
                });

                describe('When moving backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('Its position should be 4, 0, E', function () {
                        expect(marsRover.getPosition()).to.equal("4, 0, E");
                    });
                });

                describe('When turning right a second time', function () {
                    beforeEach(function () {
                        marsRover.command('R');
                    });

                    it('Its position should be 0, 0, S', function () {
                        expect(marsRover.getPosition()).to.equal("0, 0, S");
                    });

                    describe('When moving forward', function () {
                        beforeEach(function () {
                            marsRover.command('F');
                        });

                        it('Its position should be 0, 9, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, 9, S");
                        });
                    });

                    describe('When moving backward', function () {
                        beforeEach(function () {
                            marsRover.command('B');
                        });

                        it('Its position should be 0, 1, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, 1, S");
                        });
                    });

                    describe('When turning right a third time', function () {
                        beforeEach(function () {
                            marsRover.command('R');
                        });

                        it('Its position should be 0, 0, W', function () {
                            expect(marsRover.getPosition()).to.equal("0, 0, W");
                        });

                        describe('When moving forward', function () {
                            beforeEach(function () {
                                marsRover.command('F');
                            });

                            it('Its position should be 4, 0, W', function () {
                                expect(marsRover.getPosition()).to.equal("4, 0, W");
                            });
                        });

                        describe('When moving backward', function () {
                            beforeEach(function () {
                                marsRover.command('B');
                            });

                            it('Its position should be 1, 0, W', function () {
                                expect(marsRover.getPosition()).to.equal("1, 0, W");
                            });
                        });

                        describe('When turning right a fourth time', function () {
                            beforeEach(function () {
                                marsRover.command('R');
                            });

                            it('Its position should be 0, 0, N', function () {
                                expect(marsRover.getPosition()).to.equal("0, 0, N");
                            });

                            describe('When moving forward', function () {
                                beforeEach(function () {
                                    marsRover.command('F');
                                });

                                it('Its position should be 0, 1, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, 1, N");
                                });
                            });

                            describe('When moving backward', function () {
                                beforeEach(function () {
                                    marsRover.command('B');
                                });

                                it('Its position should be 0, 9, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, 9, N");
                                });
                            });
                        });
                    });
                });
            });

            describe('When turning left', function () {
                beforeEach(function () {
                    marsRover.command('L');
                });

                it('Its position should be 0, 0, W', function () {
                    expect(marsRover.getPosition()).to.equal("0, 0, W");
                });

                describe('When moving forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('Its position should be 4, 0, W', function () {
                        expect(marsRover.getPosition()).to.equal("4, 0, W");
                    });
                });

                describe('When moving backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('Its position should be 1, 0, W', function () {
                        expect(marsRover.getPosition()).to.equal("1, 0, W");
                    });
                });

                describe('When turning left a second time', function () {
                    beforeEach(function () {
                        marsRover.command('L');
                    });

                    it('Its position should be 0, 0, S', function () {
                        expect(marsRover.getPosition()).to.equal("0, 0, S");
                    });

                    describe('When moving forward', function () {
                        beforeEach(function () {
                            marsRover.command('F');
                        });

                        it('Its position should be 0, 9, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, 9, S");
                        });
                    });

                    describe('When moving backward', function () {
                        beforeEach(function () {
                            marsRover.command('B');
                        });

                        it('Its position should be 0, 1, S', function () {
                            expect(marsRover.getPosition()).to.equal("0, 1, S");
                        });
                    });

                    describe('When turning left a third time', function () {
                        beforeEach(function () {
                            marsRover.command('L');
                        });

                        it('Its position should be 0, 0, E', function () {
                            expect(marsRover.getPosition()).to.equal("0, 0, E");
                        });

                        describe('When moving forward', function () {
                            beforeEach(function () {
                                marsRover.command('F');
                            });

                            it('Its position should be 1, 0, E', function () {
                                expect(marsRover.getPosition()).to.equal("1, 0, E");
                            });
                        });

                        describe('When moving backward', function () {
                            beforeEach(function () {
                                marsRover.command('B');
                            });

                            it('Its position should be 4, 0, E', function () {
                                expect(marsRover.getPosition()).to.equal("4, 0, E");
                            });
                        });

                        describe('When turning left a fourth time', function () {
                            beforeEach(function () {
                                marsRover.command('L');
                            });

                            it('Its position should be 0, 0, N', function () {
                                expect(marsRover.getPosition()).to.equal("0, 0, N");
                            });

                            describe('When moving forward', function () {
                                beforeEach(function () {
                                    marsRover.command('F');
                                });

                                it('Its position should be 0, 1, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, 1, N");
                                });
                            });

                            describe('When moving backward', function () {
                                beforeEach(function () {
                                    marsRover.command('B');
                                });

                                it('Its position should be 0, 9, N', function () {
                                    expect(marsRover.getPosition()).to.equal("0, 9, N");
                                });
                            });
                        });
                    });
                });
            });
        });

        describe('Multiple movements', function () {
            describe('When moving forwards twice, turning right once, and moving forwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('F');
                    marsRover.command('F');
                    marsRover.command('R');
                    marsRover.command('F');
                    marsRover.command('F');
                });

                it('Its position should be 2, 2, E', function () {
                    expect(marsRover.getPosition()).to.equal("2, 2, E");
                });
            });

            describe('When moving backwards twice, turning left once, and moving backwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('B');
                    marsRover.command('B');
                    marsRover.command('L');
                    marsRover.command('B');
                    marsRover.command('B');
                });

                it('Its position should be 2, 8, W', function () {
                    expect(marsRover.getPosition()).to.equal("2, 8, W");
                });
            });
        });

        describe('Multiple commands', function () {
            describe('When moving forwards twice, turning right once, and moving forwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('FFRFF');
                });

                it('Its position should be 2, 2, E', function () {
                    expect(marsRover.getPosition()).to.equal("2, 2, E");
                });
            });

            describe('When moving backwards twice, turning left once, and moving backwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('BBLBB');
                });

                it('Its position should be 2, 8, W', function () {
                    expect(marsRover.getPosition()).to.equal("2, 8, W");
                });
            });
        });

        describe('Commands causing the rover to run outside the world', function () {
            describe('Given the rover moves forwards north 10 squares on a world that is 5x10 squares', function () {
                beforeEach(function () {
                    marsRover.command('FFFFFFFFFF');
                });

                it('Its position should be 0, 0, N', function () {
                    expect(marsRover.getPosition()).to.equal('0, 0, N');
                });

                describe('Given the rover moves forwards north once more', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('Its position should be 0, 1, N', function () {
                        expect(marsRover.getPosition()).to.equal('0, 1, N');
                    });
                });
            });

            describe('Given the rover moves forwards east 5 squares on a world that is 5x10 squares', function () {
                beforeEach(function () {
                    marsRover.command('RFFFFF');
                });

                it('Its position should be 0, 0, E', function () {
                    expect(marsRover.getPosition()).to.equal('0, 0, E');
                });

                describe('Given the rover moves forwards east once more', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('Its position should be 1, 0, E', function () {
                        expect(marsRover.getPosition()).to.equal('1, 0, E');
                    });
                });
            });
            
            describe('Given the rover moves backwards north 10 squares on a world that is 5x10 squares', function () {
                beforeEach(function () {
                    marsRover.command('RRBBBBBBBBBB');
                });

                it('Its position should be 0, 0, S', function () {
                    expect(marsRover.getPosition()).to.equal('0, 0, S');
                });

                describe('Given the rover moves backwards north once more', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('Its position should be 0, 1, S', function () {
                        expect(marsRover.getPosition()).to.equal('0, 1, S');
                    });
                });
            });

            describe('Given the rover moves backwards east 5 squares on a world that is 5x10 squares', function () {
                beforeEach(function () {
                    marsRover.command('LBBBBB');
                });

                it('Its position should be 0, 0, W', function () {
                    expect(marsRover.getPosition()).to.equal('0, 0, W');
                });

                describe('Given the rover moves backwards east once more', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('Its position should be 1, 0, W', function () {
                        expect(marsRover.getPosition()).to.equal('1, 0, W');
                    });
                });
            });
        });
    });

    describe('Given a new Mars Rover with some obstacles, but without bounds', function () {
        let marsRover;
        beforeEach(function () {
            marsRover = new MarsRover([
                { x: 1, y: 1 },
                { x: -1, y: -1 },
                { x: -1, y: 1 },
                { x: 1, y: -1 }
            ]);
        });

        describe('When the Mars Rover is facing North', function () {
            describe('And there is an obstacle in front of it', function () {
                beforeEach(function () {
                    marsRover.command('RFL');
                });

                describe('And it tries to move forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('1, 0, N');
                    });
                });
            });

            describe('And there is an obstacle behind it', function () {
                beforeEach(function () {
                    marsRover.command('FFRFL');
                });

                describe('And it tries to move backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('1, 2, N');
                    });
                });
            });
        });

        describe('When the Mars Rover is facing South', function () {
            describe('And there is an obstacle in front of it', function () {
                beforeEach(function () {
                    marsRover.command('RFR');
                });

                describe('And it tries to move forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('1, 0, S');
                    });
                });
            });

            describe('And there is an obstacle behind it', function () {
                beforeEach(function () {
                    marsRover.command('RRFFLFR');
                });

                describe('And it tries to move backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('1, -2, S');
                    });
                });
            });
        });

        describe('When the Mars Rover is facing East', function () {
            describe('And there is an obstacle in front of it', function () {
                beforeEach(function () {
                    marsRover.command('FR');
                });

                describe('And it tries to move forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('0, 1, E');
                    });
                });
            });

            describe('And there is an obstacle behind it', function () {
                beforeEach(function () {
                    marsRover.command('RFFLFR');
                });

                describe('And it tries to move backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('2, 1, E');
                    });
                });
            });
        });

        describe('When the Mars Rover is facing West', function () {
            describe('And there is an obstacle in front of it', function () {
                beforeEach(function () {
                    marsRover.command('RFFLFL');
                });

                describe('And it tries to move forward', function () {
                    beforeEach(function () {
                        marsRover.command('F');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('2, 1, W');
                    });
                });
            });

            describe('And there is an obstacle behind it', function () {
                beforeEach(function () {
                    marsRover.command('FL');
                });

                describe('And it tries to move backward', function () {
                    beforeEach(function () {
                        marsRover.command('B');
                    });

                    it('It should not change position', function () {
                        expect(marsRover.getPosition()).to.equal('0, 1, W');
                    });
                });
            });
        });
    });
});