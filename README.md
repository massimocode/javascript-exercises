# JavaScript Exercises

## What is this?
This is a collection of JavaScript exercises.
The exercises are made up of unit tests which test a series of different application code files.
The basic idea is that you write the application code and try to make the tests pass.

## Who is this aimed at?
It's aimed at people who are learning JavaScript or want to practice writing JavaScript.

## What do I need to do these exercises?
You need a version of Node JS installed greater than 4.2. Make sure you also have NPM installed (this is
usually done whilst installing Node).

## How do I get set up?
1. Clone the repository
2. Open up a command line in the directory you cloned to and run "npm install"
3. Then run "npm run test". You should see the test runner output showing the failing tests.
4. (optional) I would personally highly recommend that you install [WallabyJS](http://www.wallabyjs.com/),
which is an amazing continuous test runner for JavaScript that integrates with lots of widely used IDEs.
Once you install WallabyJS, you simply run it, selecting the wallaby.conf.js file. Using WallabyJS makes
coding more like a game! WallabyJS is proprietary software (which means you have to pay for a licence) but
there is a free trial which you can use.

## Why are all the tests failing?
Because you have to provide the answers :)

## How do I provide the answers?
The idea is that you need to write the "application code". The application code is located in the lib
directory. In there, you'll find empty functions and placeholders with comments telling you what the
code should do. You need to write code inside these functions and placeholders to satisfy the requirements.

## Why won't this test pass? I have written the application code!
As my old friend used to tell me, "select ain't broke!". I have test driven the application code for all
of these tests and ensured that they can all go green, so if any of your tests are failing then there's
probably something wrong with the implementation.

There could also be something wrong with the "wiring up",
i.e. the boiler plate code, so you might want to check your change history (you are using Git!) and see if
any of your changes could have caused the tests to break.

## I'm stuck and I don't know how to solve a problem. What should I do?
If you have a programmer friend that can help you then great. If not, try searching/asking on
[Stack Overflow](http://stackoverflow.com/).

## I want to add some new tests
Sure, make a pull request and as long as it's nothing crazy I'll be happy to merge it in!