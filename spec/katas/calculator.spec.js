"use strict";

let expect = require("chai").expect;
let Calculator = require("../../lib/katas/calculator");

describe("Calculator", function() {
  describe("Given a new calculator", function() {
    let calculator;
    beforeEach(function() {
      calculator = new Calculator();
    });

    it("It should have a total of 0", function() {
      expect(calculator.getTotal()).to.equal(0);
    });

    it("It should not have any history", function() {
      expect(calculator.getHistory()).to.deep.equal([]);
    });

    describe("When undoing", function() {
      beforeEach(function() {
        calculator.undo();
      });

      it("It should have a total of 0", function() {
        expect(calculator.getTotal()).to.equal(0);
      });

      it("It should not have any history", function() {
        expect(calculator.getHistory()).to.deep.equal([]);
      });
    });

    describe("When adding 5", function() {
      beforeEach(function() {
        calculator.add(5);
      });

      it("It should have a total of 5", function() {
        expect(calculator.getTotal()).to.equal(5);
      });

      it("It should report the history as expected", function() {
        expect(calculator.getHistory()).to.deep.equal(["ADD 5"]);
      });

      describe("When undoing", function() {
        beforeEach(function() {
          calculator.undo();
        });

        it("It should have a total of 0", function() {
          expect(calculator.getTotal()).to.equal(0);
        });

        it("It should not have any history", function() {
          expect(calculator.getHistory()).to.deep.equal([]);
        });
      });

      describe("When adding 9", function() {
        beforeEach(function() {
          calculator.add(9);
        });

        it("It should have a total of 14", function() {
          expect(calculator.getTotal()).to.equal(14);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["ADD 5", "ADD 9"]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 5", function() {
            expect(calculator.getTotal()).to.equal(5);
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["ADD 5"]);
          });

          describe("When undoing", function() {
            beforeEach(function() {
              calculator.undo();
            });

            it("It should have a total of 0", function() {
              expect(calculator.getTotal()).to.equal(0);
            });

            it("It should not have any history", function() {
              expect(calculator.getHistory()).to.deep.equal([]);
            });
          });
        });
      });

      describe("When multiplying by 5", function() {
        beforeEach(function() {
          calculator.multiply(5);
        });

        it("It should have a total of 25", function() {
          expect(calculator.getTotal()).to.equal(25);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "ADD 5",
            "MULTIPLY 5"
          ]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 5", function() {
            expect(calculator.getTotal()).to.equal(5);
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["ADD 5"]);
          });

          describe("When undoing", function() {
            beforeEach(function() {
              calculator.undo();
            });

            it("It should have a total of 0", function() {
              expect(calculator.getTotal()).to.equal(0);
            });

            it("It should not have any history", function() {
              expect(calculator.getHistory()).to.deep.equal([]);
            });
          });
        });
      });

      describe("When dividing by 5", function() {
        beforeEach(function() {
          calculator.divide(5);
        });

        it("It should have a total of 1", function() {
          expect(calculator.getTotal()).to.equal(1);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["ADD 5", "DIVIDE 5"]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 5", function() {
            expect(calculator.getTotal()).to.equal(5);
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["ADD 5"]);
          });
        });
      });

      describe("When multiplied to the power of 3", function() {
        beforeEach(function() {
          calculator.power(3);
        });

        it("It should have a total of 125", function() {
          expect(calculator.getTotal()).to.equal(125);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["ADD 5", "POWER 3"]);
        });
      });

      describe("When dividing by 0", function() {
        beforeEach(function() {
          calculator.divide(0);
        });

        it("It should show an error", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["ADD 5", "DIVIDE 0"]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 5", function() {
            expect(calculator.getTotal()).to.equal(5);
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["ADD 5"]);
          });
        });

        describe("When adding 1", function() {
          beforeEach(function() {
            calculator.add(1);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "ADD 5",
              "DIVIDE 0",
              "ADD 1"
            ]);
          });
        });

        describe("When subtracting 1", function() {
          beforeEach(function() {
            calculator.subtract(1);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "ADD 5",
              "DIVIDE 0",
              "SUBTRACT 1"
            ]);
          });
        });

        describe("When multiplying by 2", function() {
          beforeEach(function() {
            calculator.multiply(2);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "ADD 5",
              "DIVIDE 0",
              "MULTIPLY 2"
            ]);
          });
        });

        describe("When dividing by 2", function() {
          beforeEach(function() {
            calculator.divide(2);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "ADD 5",
              "DIVIDE 0",
              "DIVIDE 2"
            ]);
          });
        });
      });

      describe("When clearing", function() {
        beforeEach(function() {
          calculator.clear();
        });

        it("It should have a total of 0", function() {
          expect(calculator.getTotal()).to.equal(0);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 0", function() {
            expect(calculator.getTotal()).to.equal(0);
          });

          it("It should not have any history", function() {
            expect(calculator.getHistory()).to.deep.equal([]);
          });
        });
      });
    });

    describe("When subtracting 7", function() {
      beforeEach(function() {
        calculator.subtract(7);
      });

      it("It should have a total of -7", function() {
        expect(calculator.getTotal()).to.equal(-7);
      });

      it("It should report the history as expected", function() {
        expect(calculator.getHistory()).to.deep.equal(["SUBTRACT 7"]);
      });

      describe("When undoing", function() {
        beforeEach(function() {
          calculator.undo();
        });

        it("It should have a total of 0", function() {
          expect(calculator.getTotal()).to.equal(0);
        });

        it("It should not have any history", function() {
          expect(calculator.getHistory()).to.deep.equal([]);
        });
      });

      describe("When multiplying by 8", function() {
        beforeEach(function() {
          calculator.multiply(8);
        });

        it("It should have a total of -56", function() {
          expect(calculator.getTotal()).to.equal(-56);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "SUBTRACT 7",
            "MULTIPLY 8"
          ]);
        });
      });

      describe("When dividing by 2", function() {
        beforeEach(function() {
          calculator.divide(2);
        });

        it("It should have a total of -3.5", function() {
          expect(calculator.getTotal()).to.equal(-3.5);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "SUBTRACT 7",
            "DIVIDE 2"
          ]);
        });
      });

      describe("When multiplied to the power of 3", function() {
        beforeEach(function() {
          calculator.power(3);
        });

        it("It should have a total of -343", function() {
          expect(calculator.getTotal()).to.equal(-343);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "SUBTRACT 7",
            "POWER 3"
          ]);
        });
      });

      describe("When dividing by 0", function() {
        beforeEach(function() {
          calculator.divide(0);
        });

        it("It should show an error", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "SUBTRACT 7",
            "DIVIDE 0"
          ]);
        });

        describe("When adding 1", function() {
          beforeEach(function() {
            calculator.add(1);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "SUBTRACT 7",
              "DIVIDE 0",
              "ADD 1"
            ]);
          });
        });

        describe("When subtracting 1", function() {
          beforeEach(function() {
            calculator.subtract(1);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "SUBTRACT 7",
              "DIVIDE 0",
              "SUBTRACT 1"
            ]);
          });

          describe("When undoing", function() {
            beforeEach(function() {
              calculator.undo();
            });

            it("It should have a total of ERROR", function() {
              expect(calculator.getTotal()).to.equal("ERROR");
            });

            it("It should report the history as expected", function() {
              expect(calculator.getHistory()).to.deep.equal([
                "SUBTRACT 7",
                "DIVIDE 0"
              ]);
            });
          });
        });

        describe("When multiplying by 2", function() {
          beforeEach(function() {
            calculator.multiply(2);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "SUBTRACT 7",
              "DIVIDE 0",
              "MULTIPLY 2"
            ]);
          });

          describe("When undoing", function() {
            beforeEach(function() {
              calculator.undo();
            });

            it("It should have a total of ERROR", function() {
              expect(calculator.getTotal()).to.equal("ERROR");
            });

            it("It should report the history as expected", function() {
              expect(calculator.getHistory()).to.deep.equal([
                "SUBTRACT 7",
                "DIVIDE 0"
              ]);
            });
          });
        });

        describe("When dividing by 2", function() {
          beforeEach(function() {
            calculator.divide(2);
          });

          it("It should show an error", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "SUBTRACT 7",
              "DIVIDE 0",
              "DIVIDE 2"
            ]);
          });
        });
      });

      describe("When clearing", function() {
        beforeEach(function() {
          calculator.clear();
        });

        it("It should have a total of 0", function() {
          expect(calculator.getTotal()).to.equal(0);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([]);
        });
      });
    });

    describe("When dividing by 0", function() {
      beforeEach(function() {
        calculator.divide(0);
      });

      it("It should show an error", function() {
        expect(calculator.getTotal()).to.equal("ERROR");
      });

      it("It should report the history as expected", function() {
        expect(calculator.getHistory()).to.deep.equal(["DIVIDE 0"]);
      });

      describe("When adding 1", function() {
        beforeEach(function() {
          calculator.add(1);
        });

        it("It should show an error", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["DIVIDE 0", "ADD 1"]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of ERROR", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["DIVIDE 0"]);
          });
        });
      });

      describe("When subtracting 1", function() {
        beforeEach(function() {
          calculator.subtract(1);
        });

        it("It should show an error", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "DIVIDE 0",
            "SUBTRACT 1"
          ]);
        });
      });

      describe("When multiplying by 2", function() {
        beforeEach(function() {
          calculator.multiply(2);
        });

        it("It should show an error", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "DIVIDE 0",
            "MULTIPLY 2"
          ]);
        });
      });

      describe("When dividing by 2", function() {
        beforeEach(function() {
          calculator.divide(2);
        });

        it("It should show an error", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "DIVIDE 0",
            "DIVIDE 2"
          ]);
        });
      });

      describe("When clearing", function() {
        beforeEach(function() {
          calculator.clear();
        });

        it("It should have a total of 0", function() {
          expect(calculator.getTotal()).to.equal(0);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([]);
        });
      });
    });

    describe("When adding 1", function() {
      beforeEach(function() {
        calculator.add(1);
      });

      it("It should have a total of 1", function() {
        expect(calculator.getTotal()).to.equal(1);
      });

      it("It should report the history as expected", function() {
        expect(calculator.getHistory()).to.deep.equal(["ADD 1"]);
      });

      describe("When multiplying by 0", function() {
        beforeEach(function() {
          calculator.multiply(0);
        });

        it("It should have a total of 0", function() {
          expect(calculator.getTotal()).to.equal(0);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal([
            "ADD 1",
            "MULTIPLY 0"
          ]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 1", function() {
            expect(calculator.getTotal()).to.equal(1);
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["ADD 1"]);
          });
        });
      });
    });

    describe("When adding 2", function() {
      beforeEach(function() {
        calculator.add(2);
      });

      it("It should have a total of 2", function() {
        expect(calculator.getTotal()).to.equal(2);
      });

      it("It should report the history as expected", function() {
        expect(calculator.getHistory()).to.deep.equal(["ADD 2"]);
      });

      describe("When raising to the power of 3", function() {
        beforeEach(function() {
          calculator.power(3);
        });

        it("It should have a total of 8", function() {
          expect(calculator.getTotal()).to.equal(8);
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["ADD 2", "POWER 3"]);
        });

        describe("When undoing", function() {
          beforeEach(function() {
            calculator.undo();
          });

          it("It should have a total of 2", function() {
            expect(calculator.getTotal()).to.equal(2);
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal(["ADD 2"]);
          });
        });
      });
    });

    describe("When adding 2", function() {
      beforeEach(function() {
        calculator.add(2);
      });

      it("It should have a total of 2", function() {
        expect(calculator.getTotal()).to.equal(2);
      });

      it("It should report the history as expected", function() {
        expect(calculator.getHistory()).to.deep.equal(["ADD 2"]);
      });

      describe("When dividing by 0", function() {
        beforeEach(function() {
          calculator.divide(0);
        });

        it("It should report the total as ERROR", function() {
          expect(calculator.getTotal()).to.equal("ERROR");
        });

        it("It should report the history as expected", function() {
          expect(calculator.getHistory()).to.deep.equal(["ADD 2", "DIVIDE 0"]);
        });

        describe("When dividing by 0", function() {
          beforeEach(function() {
            calculator.divide(0);
          });

          it("It should report the total as ERROR", function() {
            expect(calculator.getTotal()).to.equal("ERROR");
          });

          it("It should report the history as expected", function() {
            expect(calculator.getHistory()).to.deep.equal([
              "ADD 2",
              "DIVIDE 0",
              "DIVIDE 0"
            ]);
          });

          describe("When undoing", function() {
            beforeEach(function() {
              calculator.undo();
            });

            it("It should report the total as ERROR", function() {
              expect(calculator.getTotal()).to.equal("ERROR");
            });

            it("It should report the history as expected", function() {
              expect(calculator.getHistory()).to.deep.equal([
                "ADD 2",
                "DIVIDE 0"
              ]);
            });

            describe("When undoing", function() {
              beforeEach(function() {
                calculator.undo();
              });

              it("It should report the total as 2", function() {
                expect(calculator.getTotal()).to.equal(2);
              });

              it("It should report the history as expected", function() {
                expect(calculator.getHistory()).to.deep.equal(["ADD 2"]);
              });
            });
          });
        });
      });
    });
  });
});
