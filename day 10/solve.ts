function getStartingPoints(grid: string[][]) {
  let result: number[][] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];
      if (c === "0") {
        result.push([x, y]);
      }
    }
  }

  return result;
}

function isValidPoint(point: number[], grid: string[][]) {
  if (point[1] < 0 || point[1] >= grid.length) {
    return false;
  }
  if (point[0] < 0 || point[0] >= grid[point[1]].length) {
    return false;
  }

  return true;
}

function getReachable(point: number[], grid: string[][]) {
  const value = parseInt(grid[point[1]][point[0]]);
  if (value === 9) return [point];

  let result: number[][] = [];

  let up = [point[0], point[1] - 1];
  let down = [point[0], point[1] + 1];
  let left = [point[0] - 1, point[1]];
  let right = [point[0] + 1, point[1]];

  if (isValidPoint(up, grid)) {
    const v = parseInt(grid[up[1]][up[0]]);
    if (v > value && v - value === 1) {
      const r = getReachable(up, grid);
      result = [...r, ...result];
    }
  }

  if (isValidPoint(down, grid)) {
    const v = parseInt(grid[down[1]][down[0]]);
    if (v > value && v - value === 1) {
      const r = getReachable(down, grid);
      result = [...r, ...result];
    }
  }

  if (isValidPoint(left, grid)) {
    const v = parseInt(grid[left[1]][left[0]]);
    if (v > value && v - value === 1) {
      const r = getReachable(left, grid);
      result = [...r, ...result];
    }
  }

  if (isValidPoint(right, grid)) {
    const v = parseInt(grid[right[1]][right[0]]);
    if (v > value && v - value === 1) {
      const r = getReachable(right, grid);
      result = [...r, ...result];
    }
  }

  return result;
}

function getReachableTrails(
  point: number[],
  grid: string[][],
  trail: string = ""
) {
  const value = parseInt(grid[point[1]][point[0]]);
  if (value === 9) return [trail];

  let result: string[] = [];

  let up = [point[0], point[1] - 1];
  let down = [point[0], point[1] + 1];
  let left = [point[0] - 1, point[1]];
  let right = [point[0] + 1, point[1]];

  if (isValidPoint(up, grid)) {
    const v = parseInt(grid[up[1]][up[0]]);
    if (v > value && v - value === 1) {
      let newTrail = trail + "u" + JSON.stringify(up);
      const r = getReachableTrails(up, grid, newTrail);
      result = [...r, ...result];
    }
  }

  if (isValidPoint(down, grid)) {
    const v = parseInt(grid[down[1]][down[0]]);
    if (v > value && v - value === 1) {
      let newTrail = trail + "d" + JSON.stringify(down);
      const r = getReachableTrails(down, grid, newTrail);
      result = [...r, ...result];
    }
  }

  if (isValidPoint(left, grid)) {
    const v = parseInt(grid[left[1]][left[0]]);
    if (v > value && v - value === 1) {
      let newTrail = trail + "l" + JSON.stringify(left);
      const r = getReachableTrails(left, grid, newTrail);
      result = [...r, ...result];
    }
  }

  if (isValidPoint(right, grid)) {
    const v = parseInt(grid[right[1]][right[0]]);
    if (v > value && v - value === 1) {
      let newTrail = trail + "r" + JSON.stringify(right);
      const r = getReachableTrails(right, grid, newTrail);
      result = [...r, ...result];
    }
  }

  return [...new Set(result)];
}

function solvePart1(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));
  const startingPoints = getStartingPoints(grid);
  let sum = 0;

  for (const start of startingPoints) {
    const r = getReachable(start, grid);
    const rStr = r.map((p) => JSON.stringify(p));
    const count = [...new Set(rStr)].length;

    sum += count;
  }

  console.log("Part 1:", sum);
}

function solvePart2(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));
  const startingPoints = getStartingPoints(grid);
  let sum = 0;

  for (const start of startingPoints) {
    const r = getReachableTrails(start, grid);
    const rStr = r.map((p) => JSON.stringify(p));
    const count = [...new Set(rStr)].length;

    sum += count;
  }
  console.log("Part 2:", sum);
}

export async function day10() {
  const inFileExample = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  let input = await inFile.text();
  input = input.replaceAll("\r", "");
  let inputExample = await inFileExample.text();
  inputExample = inputExample.replaceAll("\r", "");

  solvePart1(inputExample);
  solvePart2(inputExample);
  console.log("====================");

  solvePart1(input);
  solvePart2(input);
}

day10();
