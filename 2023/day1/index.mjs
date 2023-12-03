import fs from "fs/promises";

const file = new URL("input.txt", import.meta.url);
const input = await fs.readFile(file.pathname, "utf8");

const extractCoordsFromLine = (line) => {
  const coords = [];

  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    const isNumber = !isNaN(Number(char));

    if (isNumber) {
      coords.push(char);
    }
  }

  return coords.length > 1
    ? Number(coords[0] + coords.at(-1))
    : Number(coords[0] + coords[0]);
};

const getCalibrationValues = (file) => {
  const linesArr = file.split("\n");

  return linesArr
    .map(extractCoordsFromLine)
    .reduce((acc, current) => acc + current, 0);
};

console.log(getCalibrationValues(input)); // 54159
