'use strict';

let expect = require('chai').expect;
let MarsRover = require('../lib/mars-rover');

describe('Mars Rover', function () {

    describe('Given a new Mars Rover', function () {
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

        describe('Multiple commands', function () {
            describe('When moving forwards twice, turning right once, and moving forwards twice again', function () {
                beforeEach(function () {
                    marsRover.command('FFRFF');
                });
                
                it('Its position should be 2, 2, E', function () {
                    expect(marsRover.getPosition()).to.equal("2, 2, E");
                });
            });
        });
    });
});