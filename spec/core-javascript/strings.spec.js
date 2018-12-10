"use strict";

let expect = require("chai").expect;
let strings = require("../../lib/core-javascript/strings");

describe("Strings", function() {
  describe("To Upper Case", function() {
    it('Given "abc" it should return "ABC"', function() {
      expect(strings.uppercase("abc")).to.equal("ABC");
    });

    it('Given "hello" it should return "HELLO"', function() {
      expect(strings.uppercase("hello")).to.equal("HELLO");
    });
  });

  describe("To Lower Case", function() {
    it('Given "ABC" it should return "abc"', function() {
      expect(strings.lowercase("ABC")).to.equal("abc");
    });

    it('Given "HELLO" it should return "hello"', function() {
      expect(strings.lowercase("HELLO")).to.equal("hello");
    });
  });

  describe("Starts With", function() {
    it('Given "Hello World!", "Hello" it should return true', function() {
      expect(strings.startsWith("Hello World!", "Hello")).to.be.true;
    });

    it('Given "Hello World!", "ello" it should return false', function() {
      expect(strings.startsWith("Hello World!", "ello")).to.be.false;
    });

    it('Given "Hello World!", "hello" it should return false', function() {
      expect(strings.startsWith("Hello World!", "hello")).to.be.false;
    });
  });

  describe("Ends With", function() {
    it('Given "Hello World!", "World!" it should return true', function() {
      expect(strings.endsWith("Hello World!", "World!")).to.be.true;
    });

    it('Given "Hello World!", "World" it should return false', function() {
      expect(strings.endsWith("Hello World!", "World")).to.be.false;
    });

    it('Given "Hello World!", "world!" it should return false', function() {
      expect(strings.endsWith("Hello World!", "world!")).to.be.false;
    });
  });

  describe("Contains", function() {
    it('Given "Hello World!", "World!" it should return true', function() {
      expect(strings.contains("Hello World!", "World!")).to.be.true;
    });

    it('Given "Hello World!", "World" it should return true', function() {
      expect(strings.contains("Hello World!", "World")).to.be.true;
    });

    it('Given "Hello World!", "world!" it should return false', function() {
      expect(strings.contains("Hello World!", "world!")).to.be.false;
    });
  });

  describe("Concat", function() {
    it('Given "Hello" " World!" it should return "Hello World!"', function() {
      expect(strings.concat("Hello", " World!")).to.equal("Hello World!");
    });

    it('Given "Foo", "Bar" it should return "FooBar"', function() {
      expect(strings.concat("Foo", "Bar")).to.equal("FooBar");
    });
  });

  describe("Replace", function() {
    it('Given "Hello World!", "World", "Earth" it should return "Hello Earth!"', function() {
      expect(strings.replace("Hello World!", "World", "Earth")).to.equal(
        "Hello Earth!"
      );
    });

    it('Given "Hello World!", "world", "Earth" it should return "Hello World!"', function() {
      expect(strings.replace("Hello World!", "world", "Earth")).to.equal(
        "Hello World!"
      );
    });

    it('Given "Hello World!", "o", "!" it should return "Hell! W!rld!"', function() {
      expect(strings.replace("Hello World!", "o", "!")).to.equal(
        "Hell! W!rld!"
      );
    });
  });

  describe("Substring by start and length", function() {
    it('Given "Hello World!" 0, 5 it should return "Hello"', function() {
      expect(strings.substringByStartAndLength("Hello World!", 0, 5)).to.equal(
        "Hello"
      );
    });

    it('Given "Hello World!" 6, 5 it should return "World"', function() {
      expect(strings.substringByStartAndLength("Hello World!", 6, 5)).to.equal(
        "World"
      );
    });

    it('Given "Hello World!" 6, 0 it should return ""', function() {
      expect(strings.substringByStartAndLength("Hello World!", 6, 0)).to.equal(
        ""
      );
    });
  });

  describe("Substring by start and end", function() {
    it('Given "Hello World!" 0, 5 it should return "Hello"', function() {
      expect(strings.substringByStartAndEnd("Hello World!", 0, 5)).to.equal(
        "Hello"
      );
    });

    it('Given "Hello World!" 6, 11 it should return "World"', function() {
      expect(strings.substringByStartAndEnd("Hello World!", 6, 11)).to.equal(
        "World"
      );
    });

    it('Given "Hello World!" 6, 6 it should return ""', function() {
      expect(strings.substringByStartAndEnd("Hello World!", 6, 6)).to.equal("");
    });
  });

  describe("Splitting strings", function() {
    it('Given "Hello World!" " " it should return ["Hello", "World!"]', function() {
      expect(strings.split("Hello World!", " ")).to.deep.equal([
        "Hello",
        "World!"
      ]);
    });

    it('Given "Hello World!" "o" it should return ["Hell", " W", "rld!"]', function() {
      expect(strings.split("Hello World!", "o")).to.deep.equal([
        "Hell",
        " W",
        "rld!"
      ]);
    });

    it('Given "1,2,3,4,5" "," it should return ["1", "2", "3", "4", "5"]', function() {
      expect(strings.split("1,2,3,4,5", ",")).to.deep.equal([
        "1",
        "2",
        "3",
        "4",
        "5"
      ]);
    });
  });

  describe("Joining arrays into strings", function() {
    it('Given ["Hello", "World!"] and " " it should return "Hello World!"', function() {
      expect(strings.join(["Hello", "World!"], " ")).to.equal("Hello World!");
    });

    it('Given ["Hell", " W", "rld!"] and "o" it should return "Hello World!"', function() {
      expect(strings.join(["Hell", " W", "rld!"], "o")).to.equal(
        "Hello World!"
      );
    });

    it('Given ["1", "2", "3", "4", "5"] and "," it should return "1,2,3,4,5"', function() {
      expect(strings.join(["1", "2", "3", "4", "5"], ",")).to.equal(
        "1,2,3,4,5"
      );
    });
  });

  describe("Reverse", function() {
    it("Given abc it should return cba", function() {
      expect(strings.reverse("abc")).to.equal("cba");
    });

    it("Given ABC it should return CBA", function() {
      expect(strings.reverse("ABC")).to.equal("CBA");
    });

    it("Given hello it should return olleh", function() {
      expect(strings.reverse("hello")).to.equal("olleh");
    });

    it("Given HELLO it should return OLLEH", function() {
      expect(strings.reverse("HELLO")).to.equal("OLLEH");
    });
  });
});
