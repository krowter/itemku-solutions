const solution = (_relations) => {
  const columns = _relations[0].length;
  let relations = [..._relations];
  let candidateKeys = 0;
  let candidateKeysIndex = [];

  for (let i = 0; i < columns - 1; i++) {
    // unique key must be one of candidate keys
    if (isUniqueKey(relations, i)) {
      candidateKeys++;
      candidateKeysIndex.push(i);
    }
  }

  // remove known candidate keys because they can't
  // be part of another candidate keys
  relations = removeColumn(relations, candidateKeysIndex);

  const combinations = findAllSubsetsoOfGivenSet(
    createSeries(relations[0].length)
  ).filter((combination) => combination.length > 1);

  // reset indexes to hold index of multiple columns below
  candidateKeysIndex = [];

  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];
    if (isUniqueKey(combineColumns(relations, combination))) {
      // only consider candidate key if no subset of it is
      // already another candidate key
      if (
        candidateKeysIndex
          .filter((c) => c.length > 1)
          .some((keysIndex) => isStrictSubsetOf(combination, keysIndex))
      ) {
        continue;
      } else {
        candidateKeysIndex.push(combination);
        candidateKeys++;
      }
    }
  }

  return candidateKeys;
};

const combineColumns = (data, index) => {
  return data.map((row) => row.filter((_, i) => index.includes(i)).join(""));
};

const getColumn = (data, index = 0) => {
  if (!Array.isArray(index)) {
    return data.map((row) => row[index]);
  } else {
    return data.map((row) => index.map((index) => row[index]));
  }
};

const removeColumn = (data, index) => {
  if (!Array.isArray(index)) {
    return data.map((row) => row.filter((_, i) => i !== index));
  } else {
    return data.map((row) => row.filter((_, i) => !index.includes(i)));
  }
};

const isUniqueKey = (data, index = -1) => {
  if (index < 0) {
    return new Set(data).size === data.length;
  } else {
    return new Set(getColumn(data, index)).size === data.length;
  }
};

const isStrictSubsetOf = (array, subArray) => {
  return (
    subArray.every((item) => array.includes(item)) &&
    array.length > subArray.length
  );
};

const createSeries = (n, start = 0) =>
  Array.from(Array(n)).map((_, i) => i + start);

// source of below function
// https://www.tutorialspoint.com/how-to-find-all-subsets-of-a-set-in-javascript
const findAllSubsetsoOfGivenSet = (originalArrayValue) =>
  originalArrayValue.reduce(
    (givenSet, setValue) =>
      givenSet.concat(givenSet.map((givenSet) => [setValue, ...givenSet])),
    [[]]
  );

module.exports = { solution };
