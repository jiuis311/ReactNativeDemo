"use strict";

const MAX_LENGTH = 50;
const MIN_NUM = -10000;
const MAX_NUM = 10000;

const TestType = {
  ZERO_LENGTH: "ZERO_LENGTH",
  NOT_FOUND: "NOT_FOUND",
  FIRST_INDEX: "FIRST_INDEX",
  LAST_INDEX: "LAST_INDEX",
  RANDOM: "RANDOM"
};

function generate(numberOfTestcases) {
  return Array.from({length: numberOfTestcases}); // Remove this line and use your own algorithm
}

module.exports = generate;
