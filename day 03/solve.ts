function solvePart1(input: string) {
  const mulRx = /mul\((\d+),(\d+)\)/g;

  let matches = input.matchAll(mulRx);
  let sum = 0;

  for (const match of matches) {
    let n1 = parseInt(match[1]);
    let n2 = parseInt(match[2]);

    sum += n1 * n2;
  }

  console.log("Part 1:", sum);
}

function getvalueForInstructions(input: string) {
  const mulRx = /mul\((\d+),(\d+)\)/g;

  let matches = input.matchAll(mulRx);
  let sum = 0;

  for (const match of matches) {
    let n1 = parseInt(match[1]);
    let n2 = parseInt(match[2]);

    sum += n1 * n2;
  }

  return sum;
}

function solvePart2(input: string) {
  let isEnabled = true;
  let str = input;

  let sum = 0;

  while (str.length > 0) {
    if (isEnabled) {
      let end = str.indexOf("don't()");
      if (end === -1) {
        sum += getvalueForInstructions(str);
        break;
      }
      let chunk = str.substring(0, end);
      sum += getvalueForInstructions(chunk);

      str = str.substring(end + 6);
      isEnabled = false;

      continue;
    }

    let end = str.indexOf("do()");
    str = str.substring(end + 3);
    isEnabled = true;
  }

  console.log("Part 2:", sum);
}

export async function day3() {
  // const inFile = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  const input = await inFile.text();

  solvePart1(input);
  solvePart2(input);
}

day3();
