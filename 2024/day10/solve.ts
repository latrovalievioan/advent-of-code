import * as fs from "fs";

const test_matrix = fs
    .readFileSync("./test_input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").map(Number));

const matrix = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").map(Number));

const DELTAS = {
    U: { i: -1, j: 0 },
    R: { i: 0, j: 1 },
    D: { i: 1, j: 0 },
    L: { i: 0, j: -1 },
};

type DFSArgs = {
    matrix: number[][];
    i: number;
    j: number;
    peaksSet: Set<string>;
    reachedPeaks: string[];
    prevVal: number;
};

const dfs = ({ i, j, peaksSet, reachedPeaks, matrix, prevVal }: DFSArgs) => {
    if (!matrix[i] || !matrix[i][j]) return;

    if (isNaN(matrix[i][j])) return;

    if (matrix[i][j] - prevVal !== 1) return;


    if (matrix[i][j] === 9) {
        const peak = `${i},${j}`

        reachedPeaks.push(peak)

        if (peaksSet.has(peak)) return;

        peaksSet.add(peak);

        return;
    }

    for (const delta of Object.keys(DELTAS) as Array<keyof typeof DELTAS>) {
        dfs({
            matrix,
            i: i + DELTAS[delta].i,
            j: j + DELTAS[delta].j,
            peaksSet,
            reachedPeaks,
            prevVal: matrix[i][j],
        });
    }
};

const solve = (matrix: number[][]) => {
    let part1 = 0;
    let part2 = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] !== 0) continue;

            const peaksSet = new Set<string>();
            const reachedPeaks = []

            for (const delta of Object.keys(DELTAS) as Array<
                keyof typeof DELTAS
            >) {
                dfs({
                    matrix: matrix,
                    i: i + DELTAS[delta].i,
                    j: j + DELTAS[delta].j,
                    peaksSet,
                    reachedPeaks,
                    prevVal: 0,
                });
            }

            part1 += peaksSet.size
            part2 += reachedPeaks.length
        }
    }

    return {part1, part2}
};

console.log(solve(matrix));
