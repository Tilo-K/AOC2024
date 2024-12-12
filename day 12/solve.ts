interface Plant {
  type: string;
  x: number;
  y: number;

  topFree: boolean;
  bottomFree: boolean;
  leftFree: boolean;
  rightFree: boolean;
}

function getNextPlant(grid: string[][], areas: Plant[][]): Plant | null {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const p = grid[y][x];
      const exists = areas.some(area => area.some(pl => pl.x === x && pl.y === y));

      if (!exists) {
        return { type: p, x, y, topFree: false, bottomFree: false, leftFree: false, rightFree: false };
      }
    }
  }

  return null;
}

function getArea(curr: Plant, area: Plant[], grid: string[][]) {
  area.push(curr);

  if (curr.x - 1 >= 0) {
    const x = curr.x - 1;
    const y = curr.y;
    const p = grid[y][x];
    if (p !== curr.type) {
      curr.leftFree = true;
    } else {
      curr.leftFree = false;
      if (!area.some(pl => pl.x === x && pl.y === y)) {
        area = getArea({ type: p, x, y, topFree: false, bottomFree: false, leftFree: false, rightFree: false }, area, grid);
      }
    }
  } else {
    curr.leftFree = true;
  }

  if (curr.x + 1 < grid[curr.y].length) {
    const x = curr.x + 1;
    const y = curr.y;
    const p = grid[y][x];
    if (p !== curr.type) {
      curr.rightFree = true;
    } else {
      curr.rightFree = false;
      if (!area.some(pl => pl.x === x && pl.y === y)) {
        area = getArea({ type: p, x, y, topFree: false, bottomFree: false, leftFree: false, rightFree: false }, area, grid);
      }
    }
  } else {
    curr.rightFree = true;
  }


  if (curr.y - 1 >= 0) {
    const x = curr.x;
    const y = curr.y - 1;
    const p = grid[y][x];
    if (p !== curr.type) {
      curr.topFree = true;
    } else {
      curr.topFree = false;
      if (!area.some(pl => pl.x === x && pl.y === y)) {
        area = getArea({ type: p, x, y, topFree: false, bottomFree: false, leftFree: false, rightFree: false }, area, grid);
      }
    }
  } else {
    curr.topFree = true;
  }


  if (curr.y + 1 < grid.length) {
    const x = curr.x;
    const y = curr.y + 1;
    const p = grid[y][x];
    if (p !== curr.type) {
      curr.bottomFree = true;
    } else {
      curr.bottomFree = false;
      if (!area.some(pl => pl.x === x && pl.y === y)) {
        area = getArea({ type: p, x, y, topFree: false, bottomFree: false, leftFree: false, rightFree: false }, area, grid);
      }
    }
  } else {
    curr.bottomFree = true;
  }

  return area;
}

function getPerimeter(area: Plant[]) {
  let sum = 0;
  for (const p of area) {
    if (p.topFree) sum++;
    if (p.bottomFree) sum++;
    if (p.leftFree) sum++;
    if (p.rightFree) sum++;
  }

  return sum;
}

function sharesX(area: Plant[]) {
  let xs = new Set<number>();
  for (const p of area) {
    xs.add(p.x);
  }

  const grouped: Plant[][] = [];
  for (const x of xs) {
    const g = area.filter(p => p.x === x);
    grouped.push(g);
  }
  return grouped;
}


function sharesY(area: Plant[]) {
  let ys = new Set<number>();
  for (const p of area) {
    ys.add(p.y);
  }

  const grouped: Plant[][] = [];
  for (const y of ys) {
    const g = area.filter(p => p.y === y);
    grouped.push(g);
  }
  return grouped;
}

function getSides(area: Plant[]) {
  const xsh = sharesX(area);
  const ysh = sharesY(area);

  const xs: Plant[][] = [];
  const ys: Plant[][] = [];

  for (const row of xsh) {
    let lastY = row[0].y;
    let curr: Plant[] = [];
    for (const p of row) {
      const delta = Math.abs(p.y - lastY);
      if (delta > 1) {
        xs.push(curr);
        curr = [p];
      } else {
        curr.push(p);
      }

      lastY = p.y;
    }
    if (curr.length > 0) xs.push(curr);
  }

  for (const row of ysh) {
    let lastX = row[0].x;
    let curr: Plant[] = [];
    for (const p of row) {
      const delta = Math.abs(p.x - lastX);
      if (delta > 1) {
        ys.push(curr);
        curr = [p];
      } else {
        curr.push(p);
      }

      lastX = p.x;
    }
    if (curr.length > 0) ys.push(curr);
  }
  let sides = 0;

  for (const a of xs) {
    let left = false;
    let right = false;
    for (const p of a) {
      left = left || p.leftFree;
      right = right || p.rightFree;
    }
    if (left) sides++;
    if (right) sides++;
  }


  for (const a of ys) {
    let top = false;
    let bottom = false;
    for (const p of a) {
      top = top || p.topFree;
      bottom = bottom || p.bottomFree;
    }
    if (top) sides++;
    if (bottom) sides++;
  }

  return sides;
}

function solvePart1(input: string) {
  const grid = input.split("\n").map(l => l.split(""));
  let areas: Plant[][] = [];
  let next = getNextPlant(grid, areas);
  while (next) {
    const area = getArea(next, [], grid);
    areas.push(area);
    next = getNextPlant(grid, areas);
  }

  let sum = 0;
  for (const a of areas) {
    let c = a.length;
    let p = getPerimeter(a);
    sum += (c * p);
  }

  console.log("Part 1:", sum);
}
function solvePart2(input: string) {
  const grid = input.split("\n").map(l => l.split(""));
  let areas: Plant[][] = [];
  let next = getNextPlant(grid, areas);
  while (next) {
    const area = getArea(next, [], grid);
    areas.push(area);
    next = getNextPlant(grid, areas);
  }

  let sum = 0;
  for (const a of areas) {
    let c = a.length;
    let p = getSides(a);

    console.log(a[0].type, c, "*", p, "\t=", c * p);

    sum += (c * p);
  }

  console.log("Part 2:", sum);
}

export async function day12() {
  const inFileExample = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  let input = await inFile.text();
  input = input.replaceAll("\r", "");
  let inputExample = await inFileExample.text();
  inputExample = inputExample.replaceAll("\r", "");

  solvePart1(inputExample);
  solvePart2(inputExample);
  console.log("====================");
  // solvePart1(input);
  // solvePart2(input);
}

day12();
