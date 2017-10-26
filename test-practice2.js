const Jasmine = require("jasmine");
const jasmine = new Jasmine();
const fs = require("fs");

const Reporter = require("jasmine-spec-reporter").SpecReporter;
const customReporter = require("./customReporter");
jasmine.jasmine.getEnv().clearReporters();
jasmine.jasmine.getEnv().addReporter(
  new Reporter({
    spec: {
      displaySuccessful: false,
      displayPending: true,
      displayFailed: false
    }
  })
);
jasmine.jasmine.getEnv().addReporter(customReporter);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generatePractice = require("./Practice2/generatePractice");

describe("Practice 2 - Generator:", function() {
  const length = randomInt(0, 500);
  const result = generatePractice(length);

  it(`generated data length must equal to length input`, function() {
    expect(result.length).toEqual(length);
  });

  it(`generated data input length must less than 500`, function() {
    result.forEach(item => {
      expect(item.input.length <= 500).toBeTruthy();
    });
  });

  it(`generated output must be sorted`, function() {
    expect(
      result.some(item => {
        const sortedInput = item.input.slice().sort((a, b) => a - b);

        return item.input.some(
          (number, index) => number !== sortedInput[index]
        );
      })
    ).toBe(false);
  });

  it(`generated output doesn't contain duplicates`, function() {
    expect(
      result.some(item => {
        const sortedInput = item.input.slice().sort((a, b) => a - b);

        return sortedInput.some(
          (number, index) =>
            index < sortedInput.length - 1 && number === sortedInput[index + 1]
        );
      })
    ).toBe(false);
  });

  it(`generated output value must equal to index of target`, function() {
    result.forEach(item => {
      expect(item.input.indexOf(item.target)).toEqual(item.output);
    });
  });

  if (length > 4) {
    it(`generated data must contain an input empty array`, function() {
      expect(result.find(e => e.input.length === 0)).not.toBeUndefined();
    });
    it(`generated data must contain an input with target not found`, function() {
      expect(
        result.find(e => e.input.indexOf(e.target) === -1)
      ).not.toBeUndefined();
    });
    it(`generated data must contain target at index 0`, function() {
      expect(result.find(e => e.input[0] === e.target)).not.toBeUndefined();
    });
    it(`generated data must contain target at last index`, function() {
      expect(
        result.find(e => e.input[e.input.length - 1] === e.target)
      ).not.toBeUndefined();
    });
  }
});

jasmine.execute();
