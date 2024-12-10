function expand(input: string) {
  let res: string[] = [];
  let id = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2 == 0) {
      let n = parseInt(input[i]);
      for (let j = 0; j < n; j++) {
        res.push(id.toString());
      }
      id++;
    } else {
      let n = parseInt(input[i]);
      for (let j = 0; j < n; j++) {
        res.push(".");
      }
    }
  }

  return res;
}

function solvePart1(input: string) {
  const expanded = expand(input);
  if (input.length < 50) {
    console.log(expanded.join(""));
  }

  for (let l = 0; l < expanded.length; l++) {
    let didSwap = false;
    const c = expanded[l];

    if (c !== ".") continue;

    for (let r = expanded.length - 1; r > l; r--) {
      const rc = expanded[r];
      if (rc !== ".") {
        expanded[l] = expanded[r];
        expanded[r] = ".";
        didSwap = true;

        if (input.length < 50) {
          console.log(expanded.join(""));
        }
        break;
      }
    }

    if (!didSwap) break;
  }

  let checksum = 0;
  for (let i = 0; i < expanded.length; i++) {
    const c = expanded[i];
    if (c === ".") break;

    const num = i * parseInt(c);
    checksum += num;
  }
  console.log("Part 1:", checksum);
}

function getLastMostFile(
  expanded: string[],
  seen: Set<string>,
  leftMost: number = expanded.length - 1
) {
  for (let i = leftMost; i > 0; i--) {
    const file = expanded[i];
    if (file !== "." && !seen.has(file)) {
      let result = [file];
      for (let j = i - 1; j > 0; j--) {
        const file2 = expanded[j];
        if (file === file2) {
          result.push(file2);
        } else {
          break;
        }
      }
      if (canMove(result, expanded, seen)) {
        return result;
      } else {
        seen.add(result[0]);
      }
    }
  }

  return [];
}

function moveFileToFreeSpace(file: string[], expanded: string[]) {
  for (let i = 0; i < expanded.length - file.length; i++) {
    const sub = expanded.slice(i, i + file.length);
    const dots = sub.every((v) => v === ".");
    const moreLeft = expanded.indexOf(file[0]) > i;

    if (!dots && moreLeft) continue;
    for (let j = 0; j < expanded.length; j++) {
      const v = expanded[j];
      if (v === file[0]) {
        expanded[j] = ".";
      }
    }

    for (let j = i; j < i + file.length; j++) {
      expanded[j] = file[0];
    }

    return true;
  }

  return false;
}

function canMove(file: string[], expanded: string[], seen: Set<string>) {
  if (seen.has(file[0])) return false;
  for (let i = 0; i < expanded.length - file.length; i++) {
    const sub = expanded.slice(i, i + file.length);
    const dots = sub.every((v) => v === ".");
    const moreLeft = expanded.indexOf(file[0]) > i;
    if (!dots && moreLeft) continue;

    return true;
  }

  return false;
}

/*
    Veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery slow
    and veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery bad

    But works. Just takes about 18 Hours :)
*/
function solvePart2(input: string) {
  let expanded = expand(input);
  if (input.length < 50) {
    console.log(expanded.join(""));
  }

  const seen = new Set<string>();
  seen.add(expanded[0]);
  let lastMost = getLastMostFile(expanded, seen);
  const unique = [...new Set(expanded)].length - 1;

  while (lastMost.length > 0) {
    const s = [...seen].length;
    if (s % 1000) {
      console.log((s / unique) * 100, "%");
    }
    moveFileToFreeSpace(lastMost, expanded);
    seen.add(lastMost[0]);
    lastMost = getLastMostFile(expanded, seen);
    if (input.length < 50) {
      console.log(expanded.join(""));
    }
  }

  let checksum = 0;
  for (let i = 0; i < expanded.length; i++) {
    const c = expanded[i];
    if (c === ".") continue;

    const num = i * parseInt(c);
    checksum += num;
  }
  console.log("Part 2:", checksum);
}

export async function day9() {
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

day9();
