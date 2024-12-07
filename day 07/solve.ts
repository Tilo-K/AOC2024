function solvePart1(input: string) {
  let possible = 0;
  let sum = 0;
  const lines = input.split("\n");

  for (const line of lines) {
    const target = parseInt(line.split(": ")[0]);
    const nums = line
      .split(": ")[1]
      .split(" ")
      .map((n) => parseInt(n));

    const found = doStuff(nums, target);
    if (found === target) {
      possible++;
      sum += target;
    }
  }

  console.log("Part 1:", sum);
}

function solvePart2(input: string) {
  let possible = 0;
  let sum = 0;
  const lines = input.split("\n");

  for (const line of lines) {
    const target = parseInt(line.split(": ")[0]);
    const nums = line
      .split(": ")[1]
      .split(" ")
      .map((n) => parseInt(n));

    const found = doStuff2(nums, target);
    if (found === target) {
      possible++;
      sum += target;
    }
  }
  console.log("Part 2:", sum);
}

function doStuff(
  nums: number[],
  target: number,
  operator: string = "+",
  current: number = 0
): number {
  if (nums.length === 0) return current;
  let curr = nums[0];
  let n = nums.toSpliced(0, 1);

  let calc = current;
  if (operator === "+") {
    calc += curr;
  } else if (operator === "*") {
    calc *= curr;
  }

  let plus = doStuff(n, target, "+", calc);
  let mul = doStuff(n, target, "*", calc);

  if (plus === target) return plus;
  if (mul === target) return mul;

  return -1;
}

function doStuff2(
  nums: number[],
  target: number,
  operator: string = "+",
  current: number = 0
): number {
  if (nums.length === 0) return current;
  let curr = nums[0];
  let n = nums.toSpliced(0, 1);

  let calc = current;
  if (operator === "+") {
    calc += curr;
  } else if (operator === "*") {
    calc *= curr;
  } else if (operator === "||") {
    calc = parseInt(calc.toString() + curr);
  }

  let plus = doStuff2(n, target, "+", calc);
  let mul = doStuff2(n, target, "*", calc);
  let concat = doStuff2(n, target, "||", calc);

  if (plus === target) return plus;
  if (mul === target) return mul;
  if (concat === target) return concat;

  return -1;
}

export async function day7() {
  // const inFile = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  let input = await inFile.text();
  input = input.replaceAll("\r", "");

  solvePart1(input);
  solvePart2(input);
}

day7();
