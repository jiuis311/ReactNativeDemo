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
  const testTypes =
    numberOfTestcases > 4
      ? randomTestTypes(numberOfTestcases)
      : Array.from({ length: numberOfTestcases }, (item, index) => ({
          index: index,
          type: TestType.RANDOM
        }));
  return generateDataSet([], numberOfTestcases, testTypes);
}

function randomTestTypes(numberOfTestcases) {
  const seedArray = Array.from(
    { length: numberOfTestcases },
    (item, index) => index
  );
  const { specialCases, randomCases } = getRandomTestTypes([], 4, seedArray);
  const specialTypes = specialCases.map(
    (item, index) =>
      index === 0
        ? { index: item, type: TestType.ZERO_LENGTH }
        : index === 1
          ? { index: item, type: TestType.NOT_FOUND }
          : index === 2
            ? { index: item, type: TestType.FIRST_INDEX }
            : index === 3
              ? { index: item, type: TestType.LAST_INDEX }
              : { index: item, type: TestType.RANDOM }
  );

  return specialTypes.concat(
    Array.from(randomCases, item => ({ index: item, type: TestType.RANDOM }))
  );
}

function getRandomTestTypes(items, n, seed) {
  const randomIndex = randomInt(0, seed.length);
  return items.length === n
    ? { specialCases: items, randomCases: seed }
    : getRandomTestTypes(
        items.concat([seed[randomIndex]]),
        n,
        removeFromArr(seed, randomIndex)
      );
}

function generateDataSet(generatedTestCases, numberOfTestcases, testTypes) {
  return generatedTestCases.length === numberOfTestcases
    ? generatedTestCases
    : generateDataSet(
        generateTestCase(generatedTestCases, testTypes),
        numberOfTestcases,
        testTypes
      );
}

function generateTestCase(generatedTestCases, testTypes) {
  const type = testTypes.find(item => item.index === generatedTestCases.length)
    .type;

  const arrayLength =
    type === TestType.ZERO_LENGTH ? 0 : randomInt(0, MAX_LENGTH + 1);

  const input = generateInput(
    [],
    arrayLength,
    Array.from(Array(MAX_NUM - MIN_NUM), (item, index) => index + MIN_NUM)
  ).sort((a, b) => a - b);

  const { target, output } = createTarget(type, input);

  return generatedTestCases.concat([
    {
      input,
      target,
      output
    }
  ]);
}

function generateInput(generatedInputs, length, pool) {
  const randomIndex = randomInt(0, pool.length);
  return generatedInputs.length === length
    ? generatedInputs.sort((a, b) => a - b)
    : generateInput(
        generatedInputs.concat([[pool[randomIndex]]]),
        length,
        removeFromArr(pool, randomIndex)
      );
}

function createTarget(type, input) {
  return type === TestType.FIRST_INDEX
    ? { target: input[0], output: 0 }
    : type === TestType.LAST_INDEX
      ? { target: input[input.length - 1], output: input.length - 1 }
      : type === TestType.NOT_FOUND
        ? { target: MAX_NUM + randomInt(1, 100), output: -1 }
        : createRandomTarget(input);
}

function createRandomTarget(input) {
  const randomIndex = randomInt(0, input.length);
  return input.length > 0
    ? { target: input[randomIndex], output: randomIndex }
    : { target: randomInt(MIN_NUM, MAX_NUM), output: -1 };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function removeFromArr(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
}

module.exports = generate;
