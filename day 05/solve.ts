interface Rule {
  first: string;
  second: string;
}

function getRules(input: string) {
  const lines = input.split("\n");
  const ruleLines: string[] = [];

  for (const line of lines) {
    if (line === "") break;
    ruleLines.push(line);
  }

  const rules = ruleLines.map((line) => {
    const [first, second] = line.split("|");
    let r: Rule = { first, second };
    return r;
  });

  return rules;
}

function getLists(input: string) {
  const lines = input.split("\n");
  const lists: string[][] = [];

  for (const line of lines) {
    if (!line.includes(",")) continue;
    lists.push(line.split(","));
  }

  return lists;
}

function compare(elemA: string, elemB: string, rules: Rule[]) {
  let rule = rules.find((r) => r.first === elemA && r.second === elemB);

  if (!rule) {
    rule = rules.find((r) => r.first === elemB && r.second === elemA);
  }

  if (!rule) {
    throw "No rule found for " + elemA + " " + elemB;
  }

  if (elemA == rule.first) return -1;
  return 1;
}

function sortList(unsorted: string[], rules: Rule[]) {
  let list = unsorted.toSorted((a, b) => compare(a, b, rules));

  return list;
}

function solvePart1(input: string) {
  const rules = getRules(input);
  const lists = getLists(input);

  let sum = 0;
  for (const list of lists) {
    let sorted = sortList(list, rules);
    if (sorted.toString() === list.toString()) {
      sum += parseInt(sorted[Math.floor(sorted.length / 2)]);
    }
  }
  console.log("Part 1: ", sum);
}

function solvePart2(input: string) {
  const rules = getRules(input);
  const lists = getLists(input);

  let sum = 0;
  for (const list of lists) {
    let sorted = sortList(list, rules);
    if (JSON.stringify(sorted) !== JSON.stringify(list)) {
      sum += parseInt(sorted[Math.floor(sorted.length / 2)]);
    }
  }
  console.log("Part 2: ", sum);
}

export async function day5() {
  //const inFile = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  const input = await inFile.text();

  solvePart1(input);
  solvePart2(input);
}

day5();
