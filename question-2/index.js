const solution = (noOfStages, userStages) => {
  const { stages, noOfPlayersPerStage } = setUpStages(noOfStages, userStages);

  // for any stage K, failure rate is defined as
  // number of current players /number of players in stage >= K
  noOfPlayersPerStage.forEach((noOfCurrentPlayer, index) => {
    const noOfCompletingPlayers = arraySum(noOfPlayersPerStage.slice(index));

    if (index + 1 > noOfStages) return;

    stages[index].failureRate = noOfCurrentPlayer / noOfCompletingPlayers;
  });

  return sortAndGetStageNumber(stages);
};

const setUpStages = (noOfStages, userStages) => {
  // max stage any player has reached.
  // this is different from parameter `noOfStages`
  const maxStage = Math.max(...userStages);

  // create series of N stages
  const stages = Array.from(Array(noOfStages)).map(createStage);

  const noOfPlayersPerStage = Array(maxStage).fill(0);
  userStages.forEach((stageNumber) => {
    // -1 because of 0-based indexing
    noOfPlayersPerStage[stageNumber - 1] += 1;
  });

  return { stages, noOfPlayersPerStage };
};

const sortAndGetStageNumber = (stages) =>
  stages
    .sort((a, b) => b.failureRate - a.failureRate)
    .map((stage) => stage.stageNumber);

const createStage = (_, index) => ({
  stageNumber: index + 1,
  failureRate: 0,
});

const arraySum = (arr) => arr.reduce((sum, item) => sum + item);

module.exports = { solution };
