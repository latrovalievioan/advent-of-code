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
            dir: k,
        }))
        .filter((n) => matrix[n.i][n.j] !== "#");

const bfs = (
    matrix: string[][],
    i: number,
    j: number,
    dir: keyof typeof DELTAS,
) => {
    const q = [];
    const visited = new Set<string>();

    visited.add(`${i},${j}`);

    const neighbours = getVisitableNeighbours(matrix, i, j).filter(
        (n) => !visited.has(`${n.i},${n.j}`),
    );

    neighbours.forEach((n) => {
        if (n.dir !== dir) {
            for (let i = 0; i < 1000; i++) {
                q.push(n);
            }
        }

        q.push(n);
    });

    while (q.length) {
        const current = q.shift();
        dir = current.dir

        if (matrix[current.i][current.j] === "E") {
            return current;
        }

        visited.add(`${current.i},${current.j}`);

        const neighbours = getVisitableNeighbours(
            matrix,
            current.i,
            current.j,
        ).filter((n) => !visited.has(`${n.i},${n.j}`));

        neighbours.forEach((n) => {
            if (n.dir !== dir) {
                for (let i = 0; i < 1000; i++) {
                    q.push(n);
                }
            }

            q.push(n);
        });
    }
};

const calcPathValue = (path: string[]) => {
    let dir = "R";
    let sum = 0;

    for (let i = 1; i < path.length; i++) {
        sum++;

        const [currI, currJ] = path[i].split(",");

        if (Number(currI) - 1 === Number(path[i - 1].split(",")[0])) {
            const newDir = "U";
            if (newDir !== dir) {
                sum += 1000;
                dir = newDir;
            }
        }

        if (Number(currJ) + 1 === Number(path[i - 1].split(",")[1])) {
            const newDir = "R";
            if (newDir !== dir) {
                sum += 1000;
                dir = newDir;
            }
        }

        if (Number(currI) + 1 === Number(path[i - 1].split(",")[0])) {
            const newDir = "D";
            if (newDir !== dir) {
                sum += 1000;
                dir = newDir;
            }
        }

        if (Number(currJ) - 1 === Number(path[i - 1].split(",")[1])) {
            const newDir = "L";
            if (newDir !== dir) {
                sum += 1000;
                dir = newDir;
            }
        }
    }

    return sum;
};

const p1 = (matrix: string[][]) => {
    const startCoordinates = findCoordinatesOf(matrix, "S");

    console.log(bfs(matrix, startCoordinates.i, startCoordinates.j, "R"));

    // return calcPathValue(bfs(matrix, startCoordinates.i, startCoordinates.j));
};

console.log(p1(matrix));
