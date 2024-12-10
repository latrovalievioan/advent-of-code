import * as fs from "fs";

const test_matrix = fs
    .readFileSync("./test_input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").filter(Boolean));

const matrix = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").filter(Boolean));

const isAntenna = (s: string) => {
    return s !== ".";
};

type FindAllSameFreqAntennasArgs = {
    matrix: string[][];
    freq: string;
    currI: number;
    currJ: number;
};

const findAllSameFreqAntennas = ({
    matrix,
    freq,
    currI,
    currJ,
}: FindAllSameFreqAntennasArgs) => {
    const result: Array<{ i: number; j: number }> = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] === freq && currI !== i && currJ !== j) {
                result.push({ i, j });
            }
        }
    }

    return result;
};

type FindAntiLocationArgs = {
    nextAntenaI: number;
    nextAntenaJ: number;
    currentAntenaI: number;
    currentAntenaJ: number;
};

const findAntiLocation = ({
    nextAntenaI,
            nextAntenaJ,
    currentAntenaI,
    currentAntenaJ,
}: FindAntiLocationArgs) => {
    const diffI = currentAntenaI - nextAntenaI;
    const diffJ = currentAntenaJ - nextAntenaJ;

    return {
        i: currentAntenaI + diffI,
        j: currentAntenaJ + diffJ,
    };
};

type PutAntiNodeArgs = {
    i: number;
    j: number;
    matrix: string[][];
};

const putAntiNode = ({ i, j, matrix }: PutAntiNodeArgs) => {
    if (!matrix[i] || !matrix[i][j]) {
        return;
    }

    matrix[i][j] = "#";
};

const part1 = (matrix: string[][]) => {
    let antinodes: string[][] = Array.from({ length: matrix.length }, () =>
        Array(matrix[0].length).fill("."),
    );

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            const currFreq = matrix[i][j];

            if (!isAntenna(currFreq)) continue;

            const sameFrequencyAntennas = findAllSameFreqAntennas({
                matrix,
                freq: currFreq,
                currI: i,
                currJ: j,
            });

            for (const antenna of sameFrequencyAntennas) {
                const antiLocation = findAntiLocation({
                    nextAntenaI: antenna.i,
                    nextAntenaJ: antenna.j,
                    currentAntenaI: i,
                    currentAntenaJ: j,
                });

                putAntiNode({
                    matrix: antinodes,
                    i: antiLocation.i,
                    j: antiLocation.j,
                });
            }
        }
    }

    return antinodes
        .flat()
        .reduce((acc, curr) => (curr === "#" ? acc + 1 : acc), 0);
};

console.log(part1(matrix));

type PutAntiNodesArgs = {
    matrix: string[][];
    i: number;
    j: number;
    diffI: number;
    diffJ: number;
};

const putAntiNodes = ({ matrix, i, j, diffI, diffJ }: PutAntiNodesArgs) => {
    if (!matrix[i] || !matrix[i][j]) return;

    matrix[i][j] = "#";

    putAntiNodes({ matrix, i: i + diffI, j: j + diffJ, diffI, diffJ });
};

const part2 = (matrix: string[][]) => {
    let antinodes: string[][] = Array.from({ length: matrix.length }, () =>
        Array(matrix[0].length).fill("."),
    );

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            const currFreq = matrix[i][j];

            if (!isAntenna(currFreq)) continue;

            const sameFrequencyAntennas = findAllSameFreqAntennas({
                matrix,
                freq: currFreq,
                currI: i,
                currJ: j,
            });

            if (sameFrequencyAntennas.length > 1)
                putAntiNode({ i, j, matrix: antinodes });

            for (const antenna of sameFrequencyAntennas) {
                const antiLocation = findAntiLocation({
                    nextAntenaI: antenna.i,
                    nextAntenaJ: antenna.j,
                    currentAntenaI: i,
                    currentAntenaJ: j,
                });

                putAntiNodes({
                    matrix: antinodes,
                    i: antiLocation.i,
                    j: antiLocation.j,
                    diffI: i - antenna.i,
                    diffJ: j - antenna.j,
                });
            }
        }
    }

    return antinodes
        .flat()
        .reduce((acc, curr) => (curr === "#" ? acc + 1 : acc), 0);
};

console.log(part2(matrix));
