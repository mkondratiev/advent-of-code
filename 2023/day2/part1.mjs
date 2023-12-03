import fs from "fs/promises";

const file = new URL("input.txt", import.meta.url);
const input = await fs.readFile(file.pathname, "utf8");

const getPossibleGameId = (line) => {
  const possibleCombinationMap = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const start = ": ";
  const setSeparator = "; ";
  const setScoreSeparator = ", ";

  let isPossibleGame = true;
  const gameSets = line.slice(line.indexOf(start) + start.length);
  const gameSetsAsArr = gameSets.split(setSeparator);

  for (let i = 0; i < gameSetsAsArr.length; i++) {
    const gameSet = gameSetsAsArr[i];
    const gameSetAsArr = gameSet.split(setScoreSeparator);

    const hasWrongScore = gameSetAsArr.some((set) => {
      const match = set.match(/(\d+)\s+(\w+)/);
      const score = match[1];
      const color = match[2];
      const possibleScore = possibleCombinationMap[color];

      return score > possibleScore;
    });

    if (hasWrongScore) {
      isPossibleGame = false;
      break;
    }
  }

  return isPossibleGame ? Number(line.match(/Game (\d+):/)[1]) : null;
};

const getSumOfPossibleGameIds = (input) => {
  const linesArr = input.split("\n");

  return linesArr.reduce((acc, line) => {
    const possibleGameId = getPossibleGameId(line);
    if (possibleGameId === null) return acc;
    return acc + possibleGameId;
  }, 0);
};

console.log(getSumOfPossibleGameIds(input)); // 2716
