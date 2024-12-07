import { isBreakStatement } from "typescript";

function getStartPosition(map: string[][]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "^") {
        return [x, y];
      }
    }
  }

  throw "Guard not found";
}

function turnRight(direction: number[]) {
  if (direction[0] === 0 && direction[1] === -1) {
    return [1, 0];
  }

  if (direction[0] === 1 && direction[1] === 0) {
    return [0, 1];
  }

  if (direction[0] === 0 && direction[1] === 1) {
    return [-1, 0];
  }

  if (direction[0] === -1 && direction[1] === 0) {
    return [0, -1];
  }

  throw "Invalid direction";
}

function move(position: number[], direction: number[]) {
  return [position[0] + direction[0], position[1] + direction[1]];
}

function isInsideMap(position: number[], map: string[][]) {
  if (position[1] >= map.length || position[1] < 0) {
    return false;
  }

  if (position[0] >= map[position[1]].length || position[0] < 0) {
    return false;
  }

  return true;
}

function printMap(map: string[][], visited: string[] = []) {
  for (const visit of visited) {
    let v = JSON.parse(visit) as number[];
    map[v[1]][v[0]] = "X";
  }
  for (const line of map) {
    console.log(line.join(""));
  }
}

function solvePart1(input: string) {
  const map = input.split("\n").map((l) => l.split(""));

  let position = getStartPosition(map);
  let direction = [0, -1];
  let visited = new Set<string>();

  while (isInsideMap(position, map)) {
    visited.add(JSON.stringify(position));

    let next = move(position, direction);
    if (!isInsideMap(next, map)) break;

    while (map[next[1]][next[0]] === "#") {
      direction = turnRight(direction);
      next = move(position, direction);
    }

    position = next;
  }

  //   printMap(map, [...visited]);
  console.log("Part 1:", [...visited].length);
}

function solvePart2(input: string) {
  const map2 = input.split("\n").map((l) => l.split(""));

  let possible = 0;

  for (let y = 0; y < map2.length; y++) {
    for (let x = 0; x < map2[y].length; x++) {
      const map = input.split("\n").map((l) => l.split(""));
      if (map[y][x] === "^") continue;
      map[y][x] = "#";
      let position = getStartPosition(map);
      let direction = [0, -1];
      let visited = new Set<string>();

      while (isInsideMap(position, map)) {
        visited.add(JSON.stringify(position) + "+" + JSON.stringify(direction));

        let next = move(position, direction);
        if (!isInsideMap(next, map)) break;

        if (
          visited.has(JSON.stringify(next) + "+" + JSON.stringify(direction))
        ) {
          possible++;
          break;
        }
        while (map[next[1]][next[0]] === "#") {
          direction = turnRight(direction);
          next = move(position, direction);
        }

        position = next;
      }
    }
  }
  //   printMap(map, [...visited]);
  console.log("Part 2:", possible);
}

export async function day6() {
  // const inFile = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  let input = await inFile.text();
  input = input.replaceAll("\r", "");

  solvePart1(input);
  solvePart2(input);
}

day6();
