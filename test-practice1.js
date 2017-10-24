const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const fs = require('fs');

const Reporter = require('jasmine-spec-reporter').SpecReporter;
const customReporter = require('./customReporter');
jasmine.jasmine.getEnv().clearReporters();
jasmine.jasmine.getEnv().addReporter(new Reporter({
  spec : {
    displaySuccessful : false,
    displayPending: true,
    displayFailed: false
  }
}));
jasmine.jasmine.getEnv().addReporter(customReporter);

function randomInt(min, max){
  return Math.floor(Math.random()*(max - min)) + min;
}

const tests1 = require('./Practice1/practice1-test-data.json');
const searchPractice = require('./Practice1/searchPractice');

describe("Practice 1 - Binary Search:", function() {
  tests1.forEach((testCase, index) => {
    it(`search test no. ${index}`, function() {
      expect(searchPractice(testCase.input, testCase.target)).toEqual(testCase.output);
    });
  });
});

jasmine.execute();
