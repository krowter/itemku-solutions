const assert = require("assert");

const { solution } = require("./index");

const validInput = [
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan",
];

const validInputExpected = [
  "Prodo came in.",
  "Ryan came in.",
  "Prodo has left.",
  "Prodo came in.",
];

assert.deepStrictEqual(solution(validInput), validInputExpected);

/* user with nonexistent id */
const invalidUserId = [
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid14",
];
const invalidUserIdExpected = {
  name: "Error",
  message: "User with ID uid14 not exist",
};

assert.throws(() => solution(invalidUserId), invalidUserIdExpected);

/* wrong action "Add" and "Exit" */
const invalidActionInput = ["Add uid1234 John", "Exit uid1234"];
const invalidActionInputExpected = {
  name: "Error",
  message: "Unrecognized action",
};

assert.throws(() => solution(invalidActionInput), invalidActionInputExpected);
