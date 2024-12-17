import * as fs from "fs";

const test_input = fs
    .readFileSync("./test_input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((x) => x.split(""));

const input = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((x) => x.split(""));

const DELTAS = {
    U: { i: -1, j: 0 },
    R: { i: 0, j: 1 },
    D: { i: 1, j: 0 },
    L: { i: 0, j: -1 },
} as const;

type Sides = {
    [K in keyof typeof DELTAS]: { i: number; j: number }[];
};

const search = (
    matrix: string[][],
    visited: Set<string>,
    i: number,
    j: number,
    sides: Sides,
) => {
    visited.add(`${i},${j}`);

    const neighbours: { val: string; i: number; j: number }[] = [];

    for (const delta of Object.keys(DELTAS) as Array<keyof typeof DELTAS>) {
        const { i: dI, j: dJ } = DELTAS[delta];

        if (matrix[i + dI] && matrix[i + dI][j + dJ]) {
            neighbours.push({
                val: matrix[i + dI][j + dJ],
                i: i + dI,
                j: j + dJ,
            });
        }
    }

    const sameValNeighbours = neighbours.filter((n) => n.val === matrix[i][j]);

    const visitableNeighbours = sameValNeighbours.filter(
        (n) => !visited.has(`${n.i},${n.j}`),
    );

    if (!sameValNeighbours.filter((n) => n.i === i + DELTAS.U.i).length) {
        sides.U.push({ i: i + DELTAS.U.i, j });
    }

    if (!sameValNeighbours.filter((n) => n.j === j + DELTAS.R.j).length) {
        sides.R.push({ i, j: j + DELTAS.R.j });
    }

    if (!sameValNeighbours.filter((n) => n.i === i + DELTAS.D.i).length) {
        sides.D.push({ i: i + DELTAS.D.i, j });
    }

    if (!sameValNeighbours.filter((n) => n.j === j + DELTAS.L.j).length) {
        sides.L.push({ i, j: j + DELTAS.L.j });
    }

    if (!visitableNeighbours.length) {
        return {
            area: 1,
            perimeter: 4 - sameValNeighbours.length,
        };
    }

    let areaAcc = 0;
    let accPerimeter = 0;
    for (const n of visitableNeighbours) {
        if (visited.has(`${n.i},${n.j}`)) continue;
        const { area: areaFromRec, perimeter: perimeterFromRec } = search(
            matrix,
            visited,
            n.i,
            n.j,
            sides,
        );

        areaAcc += areaFromRec;
        accPerimeter += perimeterFromRec;
    }

    return {
        area: areaAcc + 1,
        perimeter: accPerimeter + 4 - sameValNeighbours.length,
    };
};

const solve = (matrix: string[][]) => {
    const regions: {
        area: number;
        perimeter: number;
        val: string;
        upSides: number;
        leftSides: number;
        rightSides: number;
        downSides: number;
    }[] = [];
    const visited = new Set<string>();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const sides: Sides = { U: [], R: [], D: [], L: [] };
            if (visited.has(`${i},${j}`)) continue;

            regions.push({
                ...search(matrix, visited, i, j, sides),
                val: matrix[i][j],
                upSides: sides.U.sort((a, b) => a.i - b.i || a.j - b.j).reduce(
                    (acc, side, i, arr) => {
                        if (!arr[i - 1]) return acc + 1;

                        if (
                            side.j < arr[i - 1].j - 1 ||
                            side.j > arr[i - 1].j + 1 ||
                            side.i !== arr[i - 1].i
                        )
                            return acc + 1;

                        return acc;
                    },
                    0,
                ),
                rightSides: sides.R.sort(
                    (a, b) => a.j - b.j || a.i - b.i,
                ).reduce((acc, side, i, arr) => {
                    if (!arr[i - 1]) return acc + 1;

                    if (
                        side.i < arr[i - 1].i - 1 ||
                        side.i > arr[i - 1].i + 1 ||
                        side.j !== arr[i - 1].j
                    )
                        return acc + 1;

                    return acc;
                }, 0),
                downSides: sides.D.sort(
                    (a, b) => a.i - b.i || a.j - b.j,
                ).reduce((acc, side, i, arr) => {
                    if (!arr[i - 1]) return acc + 1;

                    if (
                        side.j < arr[i - 1].j - 1 ||
                        side.j > arr[i - 1].j + 1 ||
                        side.i !== arr[i - 1].i
                    )
                        return acc + 1;

                    return acc;
                }, 0),
                leftSides: sides.L.sort(
                    (a, b) => a.j - b.j || a.i - b.i,
                ).reduce((acc, side, index, arr) => {
                    if (!arr[index - 1]) return acc + 1;

                    if (
                        side.i < arr[index - 1].i - 1 ||
                        side.i > arr[index - 1].i + 1 ||
                        side.j !== arr[index - 1].j
                    ) {
                        return acc + 1;
                    }

                    return acc;
                }, 0),
            });
        }
    }

    const resRegions = regions.map((r) => ({
        area: r.area,
        perimeter: r.perimeter,
        val: r.val,
        sideCount: r.upSides + r.rightSides + r.downSides + r.leftSides,
    }));

    return {
        p1: resRegions.reduce(
            (acc, region) => acc + region.area * region.perimeter,
            0,
        ),
        p2: resRegions.reduce(
            (acc, region) => acc + region.area * region.sideCount,
            0,
        ),
    };
};

console.log(solve(input));
