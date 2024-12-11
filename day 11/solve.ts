import type { StringMappingType } from "typescript";

function shouldBeOne(stone: number) {
  return stone === 0;
}

function shouldBeSplit(stone: number) {
  let digits = stone.toString().length;

  return digits % 2 === 0;
}

function splitStone(stone: number) {
  let number = stone.toString();
  let a = number.substring(0, number.length / 2);
  let b = number.substring(number.length / 2);

  return [parseInt(a), parseInt(b)];
}

function step(stones: number[]) {
  const len = stones.length;
  for (let i = 0; i < len; i++) {
    let stone = stones[i];
    if (shouldBeOne(stone)) {
      stones[i] = 1;
      continue;
    }

    if (shouldBeSplit(stone)) {
      const [a, b] = splitStone(stone);

      stones[i] = a;
      stones.push(b);

      continue;
    }

    stones[i] = stone * 2024;
  }

  return stones;
}

function solvePart1(input: string) {
  let stones = input.split(" ").map((s) => parseInt(s));

  for (let i = 0; i < 25; i++) {
    stones = step(stones);
  }

  console.log("Part 1:", stones.length);
}

let stepsCache = new Map<string, number>();

function doSteps(stone: number, target: number, currentStep: number): number {
  if (currentStep === target) return 1;

  let i = `${stone}|${currentStep}`;
  if (stepsCache.has(i)) return stepsCache.get(i)!;

  if (shouldBeOne(stone)) {
    stone = 1;
    let res = doSteps(stone, target, currentStep + 1);

    let index = `0|${currentStep}`;
    stepsCache.set(index, res);
    return res;
  }

  if (shouldBeSplit(stone)) {
    const [a, b] = splitStone(stone);

    let resA = doSteps(a, target, currentStep + 1);
    let resB = doSteps(b, target, currentStep + 1);

    let index = `${stone}|${currentStep}`;
    stepsCache.set(index, resA + resB);

    return resA + resB;
  }

  let res = doSteps(stone * 2024, target, currentStep + 1);

  let index = `${stone}|${currentStep}`;
  stepsCache.set(index, res);

  return res;
}

function solvePart2(input: string) {
  let stones = input.split(" ").map((s) => parseInt(s));
  let sum = 0;

  for (const stone of stones) {
    sum += doSteps(stone, 75, 0);
  }

  console.log("Part 2:", sum);
}

export async function day11() {
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

day11();
