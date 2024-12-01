function getLists(input: string) {
  const lines = input.split("\n");
  let leftList = [];
  let rightList = [];

  for (const line of lines) {
    if (!line) continue;
    const parts = line.split("   ");
    leftList.push(parseInt(parts[0]));
    rightList.push(parseInt(parts[1]));
  }

  return [leftList, rightList];
}

function solvePart1(input: string) {
  const [leftList, rightList] = getLists(input);
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let distSum = 0;
  for (let i = 0; i < leftList.length; i++) {
    let delta = Math.abs(rightList[i] - leftList[i]);
    distSum += delta;
  }

  console.log("Part 1: ", distSum);
}

function solvePart2(input: string) {
  const [leftList, rightList] = getLists(input);

  let similarity = 0;
  for (let i = 0; i < leftList.length; i++) {
    let num = leftList[i];
    let occ = 0;
    for (const n of rightList) {
      if (n === num) occ++;
    }

    similarity += num * occ;
  }

  console.log("Part 2: ", similarity);
}

const inFile = Bun.file("input.txt");
const input = await inFile.text();

solvePart1(input);
solvePart2(input);
