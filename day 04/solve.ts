const searchWord = "XMAS";

function matches(word: string) {
  return (
    word === searchWord || word.split("").reverse().join("") === searchWord
  );
}

function checkHorizontal(grid: string[][], startIdx: number, y: number) {
  const row = grid[y];
  if (startIdx + searchWord.length > row.length) return false;

  let word = row.join("").substring(startIdx, startIdx + searchWord.length);

  return matches(word);
}

function checkDiagonal(grid: string[][], startIdx: number, y: number) {
  if (y + searchWord.length > grid.length) return 0;

  let found = 0;

  if (startIdx + searchWord.length <= grid[y].length) {
    let word = "";
    for (let i = 0; i < searchWord.length; i++) {
      word += grid[y + i][startIdx + i];
    }

    if (matches(word)) {
      found++;
    }
  }

  if (startIdx - searchWord.length + 1 >= 0) {
    let word = "";
    for (let i = 0; i < searchWord.length; i++) {
      word += grid[y + i][startIdx - i];
    }

    if (matches(word)) {
      found++;
    }
  }

  return found;
}

function checkVertical(grid: string[][], startIdx: number, y: number) {
  if (y + searchWord.length > grid.length) return false;

  let word = "";
  for (let i = 0; i < searchWord.length; i++) {
    word += grid[y + i][startIdx];
  }

  return matches(word);
}

function solvePart1(input: string) {
  const grid = input.split("\n").map((row) => row.split(""));
  let found = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (checkHorizontal(grid, x, y)) found++;
      if (checkVertical(grid, x, y)) found++;
      found += checkDiagonal(grid, x, y);
    }
  }

  console.log("Part 1:", found);
}

function isMas(word: string) {
  return word === "MAS" || word === "SAM";
}

function solvePart2(input: string) {
  const grid = input.split("\n").map((row) => row.split(""));
  let found = 0;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length; x++) {
      let word1 = `${grid[y - 1][x - 1]}${grid[y][x]}${grid[y + 1][x + 1]}`;
      let word2 = `${grid[y + 1][x - 1]}${grid[y][x]}${grid[y - 1][x + 1]}`;

      if (isMas(word1) && isMas(word2)) found++;
    }
  }

  console.log("Part 2:", found);
}

export async function day4() {
  // const inFile = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  const input = await inFile.text();

  solvePart1(input);
  solvePart2(input);
}

day4();
