import fs from "fs/promises";

const file = new URL("input.txt", import.meta.url);
const input = await fs.readFile(file.pathname, "utf8");

const getPowerOfFewestNumberOfEachColor = (line) => {
  const start = ": ";
  const setSeparator = "; ";
  const setScoreSeparator = ", ";

  const gameSets = line.slice(line.indexOf(start) + start.length);
  const gameSetsAsArr = gameSets.split(setSeparator);

  const minimumSetOfCubes = gameSetsAsArr.reduce(
    (acc, currentSet, i) => {
      const scores = currentSet.split(setScoreSeparator);
      scores.forEach((scoreWithColor) => {
        const match = scoreWithColor.match(/(\d+)\s+(\w+)/);
        const score = +match[1];
        const color = match[2];

        if (score > acc[color]) {
          acc[color] = score;
        }
      });
      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );

  const powerOfCubeSet = Object.values(minimumSetOfCubes).reduce(
    (acc, current, i) => {
      if (i === 0) return current;

      return acc * current;
    }
  );

  return powerOfCubeSet;
};

const getSumOfPossibleGameIds = (input) => {
  const linesArr = input.split("\n");

  return linesArr.reduce(
    (acc, line) => acc + getPowerOfFewestNumberOfEachColor(line),
    0
  );
};

console.log(getSumOfPossibleGameIds(input)); // 72227
