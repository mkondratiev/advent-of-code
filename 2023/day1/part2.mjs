import fs from "fs/promises";

const file = new URL("input.txt", import.meta.url);
const input = await fs.readFile(file.pathname, "utf8");

const getIdxByDigitMap = (txt) => {
  const wordByDigit = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const idxByDigit = {};

  for (const key in wordByDigit) {
    const keyAsRegex = new RegExp(key, "ig");
    const matchIndexes = [...txt.matchAll(keyAsRegex)].map((m) => m.index);
    if (matchIndexes.length) {
      matchIndexes.forEach((matchIdx) => {
        idxByDigit[matchIdx] = wordByDigit[key];
      });
    }
  }

  return idxByDigit;
};

const extractCoordsFromLine = (line) => {
  const idxByVal = getIdxByDigitMap(line);
  const coords = [];

  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    const isNumber = !isNaN(Number(char));

    if (isNumber) {
      coords.push(char);
    } else if (idxByVal[i]) {
      coords.push(idxByVal[i]);
    }
  }

  const resultCoords =
    coords.length > 1
      ? Number(coords.at(0) + coords.at(-1))
      : Number(coords.at(0) + coords.at(0));

  return resultCoords;
};

const getCalibrationValues = (file) => {
  const linesArr = file.split("\n");

  return linesArr
    .map(extractCoordsFromLine)
    .reduce((acc, current) => acc + current, 0);
};

console.log(getCalibrationValues(input)); // 53866
