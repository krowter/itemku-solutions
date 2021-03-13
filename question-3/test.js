const assert = require("assert");

const { solution } = require("./index");

const validInput = [
  [100, "ryan", "music", 2],
  [200, "apeach", "math", 2],
  [300, "tube", "computer", 3],
  [400, "con", "computer", 4],
  [500, "muzi", "music", 3],
  [600, "apeach", "music", 2],
];
const validInputExpected = 2;

assert.strictEqual(solution(validInput), validInputExpected);

const validInput2 = [
  [1, "scar", "test1", "key4"],
  [2, "ray", "test2", "key3"],
  [3, "neil", "test3", "key2"],
  [4, "antonio", "test4", "key1"],
  [5, "nes", "test1", "key1"],
  [6, "michael", "test2", "key2"],
  [7, "john", "test3", "key3"],
  [8, "keen", "test4", "key4"],
];
const validInput2Expected = 3;

assert.strictEqual(solution(validInput2), validInput2Expected);
