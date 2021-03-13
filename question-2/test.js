const assert = require("assert");

const { solution } = require("./index");

const validInput = [5, [2, 1, 2, 6, 2, 4, 3, 3]];
const validInputExpected = [3, 4, 2, 1, 5];

assert.deepStrictEqual(solution(...validInput), validInputExpected);

const sameStageInput = [4, [4, 4, 4, 4]];
const sameStageInputExpected = [4, 1, 2, 3];

assert.deepStrictEqual(solution(...sameStageInput), sameStageInputExpected);
