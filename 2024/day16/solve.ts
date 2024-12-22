import * as fs from "fs";

const matrix = fs
    .readFileSync("./test_input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").filter(Boolean));

console.table(matrix);

const DELTAS = {
    U: {
        i: -1,
        j: 0,
    },
    R: {
        i: 0,
        j: 1,
    },
    D: {
        i: 1,
        j: 0,
    },
    L: {
        i: 0,
        j: -1,
    },
};

const findCoordinatesOf = (matrix: string[][], node: string) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === node) return { i, j };
        }
    }

    return { i: -1, j: -1 };
};

const getVisitableNeighbours = (matrix: string[][], i: number, j: number) =>
    Object.keys(DELTAS)
        .map((k: keyof typeof DELTAS) => ({
            i: i + DELTAS[k].i,
            j: j + DELTAS[k].j,
            parentI: i,
            parendJ: j,
        }))
        .filter((n) => matrix[n.i][n.j] !== "#");

const bfs = (matrix: string[][], startI: number, startJ: number) => {
    const q = getVisitableNeighbours(matrix, startI, startJ);
    const visited = new Map<string, string>();
    visited.set(`${startI},${startJ}`, "");

    while (q.length) {
        const current = q.pop();
        visited.set(
            `${current.i},${current.j}`,
            `${current.parentI},${current.parendJ}`,
        );

        if (matrix[current.i][current.j] === "E") break;

        const neighbours = getVisitableNeighbours(
            matrix,
            current.i,
            current.j,
        ).filter((n) => !visited.has(`${n.i},${n.j}`));

        q.unshift(...neighbours);
    }

    const path: string[] = []

    const endCoordinates = findCoordinatesOf(matrix, "E");

    let nextKey = `${endCoordinates.i},${endCoordinates.j}`
    
    while(nextKey) {
        path.push(nextKey)
        nextKey = visited.get(nextKey)
    }

    return path
};

const p1 = (matrix: string[][]) => {
    const startCoordinates = findCoordinatesOf(matrix, "S");

    return bfs(matrix, startCoordinates.i, startCoordinates.j);
};

console.log(p1(matrix));
