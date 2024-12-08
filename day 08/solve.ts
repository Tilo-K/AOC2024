class Antenna {
  pos: number[];
  freq: string;

  constructor(x: number, y: number, freq: string) {
    this.pos = [x, y];
    this.freq = freq;
  }

  getAntinode(partner: Antenna) {
    const direction = [
      partner.pos[0] - this.pos[0],
      partner.pos[1] - this.pos[1],
    ];

    const antiPos = [
      partner.pos[0] + direction[0],
      partner.pos[1] + direction[1],
    ];

    return antiPos;
  }

  getHarmonicAntinodes(partner: Antenna, xBounds: number, yBounds: number) {
    const positions: number[][] = [];

    const direction = [
      partner.pos[0] - this.pos[0],
      partner.pos[1] - this.pos[1],
    ];

    const antiPos = [
      partner.pos[0] + direction[0],
      partner.pos[1] + direction[1],
    ];

    if (
      antiPos[0] >= 0 &&
      antiPos[0] < xBounds &&
      antiPos[1] >= 0 &&
      antiPos[1] < yBounds
    ) {
      positions.push(antiPos);
    }

    while (true) {
      const last = positions.at(-1);
      if (!last) break;

      const antiPos = [last[0] + direction[0], last[1] + direction[1]];

      if (
        antiPos[0] >= 0 &&
        antiPos[0] < xBounds &&
        antiPos[1] >= 0 &&
        antiPos[1] < yBounds
      ) {
        positions.push(antiPos);
      } else {
        break;
      }
    }

    return positions;
  }
}

function createAntennas(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));
  const antennas: Antenna[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];
      if (c === ".") continue;
      const an = new Antenna(x, y, c);
      antennas.push(an);
    }
  }

  return antennas;
}

function solvePart1(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));

  const antennas = createAntennas(input);
  const antiPositions: number[][] = [];

  for (const antenna of antennas) {
    const partners = antennas.filter(
      (a) => a.freq === antenna.freq && a !== antenna
    );

    for (const partner of partners) {
      const aPos = antenna.getAntinode(partner);
      if (aPos[1] >= 0 && aPos[1] < grid.length) {
        if (aPos[0] >= 0 && aPos[0] < grid[aPos[1]].length) {
          const c = grid[aPos[1]][aPos[0]];

          antiPositions.push(aPos);
        }
      }
    }
  }

  const unique = new Set<string>();
  for (const p of antiPositions) {
    unique.add(JSON.stringify(p));
  }

  console.log("Part 1:", [...unique].length);
}

function solvePart2(input: string) {
  const grid = input.split("\n").map((l) => l.split(""));

  const antennas = createAntennas(input);
  let antiPositions: number[][] = [];

  for (const antenna of antennas) {
    const partners = antennas.filter(
      (a) => a.freq === antenna.freq && a !== antenna
    );

    for (const partner of partners) {
      const positions = antenna.getHarmonicAntinodes(
        partner,
        grid[0].length,
        grid.length
      );

      antiPositions = [...antiPositions, ...positions];
    }
  }

  const unique = new Set<string>();
  for (const p of antiPositions) {
    unique.add(JSON.stringify(p));
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];
      if (c === "." || c === "#") continue;
      unique.add(JSON.stringify([x, y]));
    }
  }

  console.log("Part 2:", [...unique].length);
}

export async function day8() {
  //   const inFile = Bun.file("example-input.txt");
  const inFile = Bun.file("input.txt");
  let input = await inFile.text();
  input = input.replaceAll("\r", "");

  solvePart1(input);
  solvePart2(input);
}

day8();
