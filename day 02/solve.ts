function allIncreasingOrDecreasing(levels: number[]) {
  let allIncreasing = true;
  let allDecreasing = true;

  for (let i = 1; i < levels.length; i++) {
    if (levels[i - 1] === levels[i]) {
      return false;
    }

    if (levels[i - 1] < levels[i]) {
      allIncreasing = false;
    }

    if (levels[i - 1] > levels[i]) {
      allDecreasing = false;
    }
  }

  return allIncreasing || allDecreasing;
}

function differenceBetween(levels: number[], min: number, max: number) {
  for (let i = 1; i < levels.length; i++) {
    const delta = Math.abs(levels[i - 1] - levels[i]);
    if (delta < min || delta > max) return false;
  }

  return true;
}

function solvePart1(input: string) {
  const levels = input.split("\n").map((row) =>
    row
      .trim()
      .split(" ")
      .map((n) => parseInt(n))
  );

  let good = 0;
  for (const level of levels) {
    if (allIncreasingOrDecreasing(level) && differenceBetween(level, 1, 3)) {
      good++;
    }
  }
  console.log("Part 1", good);
}

function solvePart2(input: string) {
  const levels = input.split("\n").map((row) =>
    row
      .trim()
      .split(" ")
      .map((n) => parseInt(n))
  );

  let good = 0;
  for (const level of levels) {
    if (allIncreasingOrDecreasing(level) && differenceBetween(level, 1, 3)) {
      good++;
    } else {
      for (let i = 0; i < level.length; i++) {
        const newLevel = level.toSpliced(i, 1);
        if (
          allIncreasingOrDecreasing(newLevel) &&
          differenceBetween(newLevel, 1, 3)
        ) {
          good++;
          break;
        }
      }
    }
  }
  console.log("Part 2", good);
}

// const inFile = Bun.file("example-input.txt");
const inFile = Bun.file("input.txt");
const input = await inFile.text();

solvePart1(input);
solvePart2(input);
