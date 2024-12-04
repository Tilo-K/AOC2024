const searchWord = "XMAS";

function matches(word: string) {
  return (
    word === searchWord || word.split("").reverse().join("") === searchWord
  );
}

function checkHorizontal(grid: string[][], startIdx: number, y: number) {
  const row = grid[y];
  if (startIdx + searchWord.length >= row.length) return false;

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

function solvePart2(input: string) {
  console.log("Part 2:");
}

// const inFile = Bun.file("example-input.txt");
const inFile = Bun.file("input.txt");
const input = await inFile.text();

solvePart1(input);
solvePart2(input);
