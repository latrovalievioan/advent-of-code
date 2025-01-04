import * as fs from "fs";

const input = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => ({ i: Number(l.split(",")[0]), j: Number(l.split(",")[1]) }));

const matrix = Array.from({ length: 71 }, () =>
    Array.from({ length: 71 }, () => "."),
);

for (let i = 0; i < 1024; i++) {
    matrix[input[i].j][input[i].i] = "#";
}

// console.table(matrix);

const DELTAS = {
    UP: {
        i: -1,
        j: 0,
    },
    RIGHT: {
        i: 0,
        j: 1,
    },
    DOWN: {
        i: 1,
        j: 0,
    },
    LEFT: {
        i: 0,
        j: -1,
    },
};

type Point = {
    i: number;
    j: number;
};

const bfs = (matrix: string[][], start: Point, end: Point) => {
    const visitedParentMap: Map<string, string> = new Map();
    visitedParentMap.set(`${start.i},${start.j}`, "START");

    const q: Point[] = [];
    q.push(start);

    while (q.length) {
        const curr = q.shift();

        const neighbours = Object.values(DELTAS)
            .map((d) => ({
                i: curr.i + d.i,
                j: curr.j + d.j,
            }))
            .filter(
                (n) =>
                    matrix[n.i] && matrix[n.i][n.j] && matrix[n.i][n.j] !== "#",
            )
            .filter((n) => !visitedParentMap.has(`${n.i},${n.j}`));

        for (const n of neighbours) {
            visitedParentMap.set(`${n.i},${n.j}`, `${curr.i},${curr.j}`)
            q.push(n)
        }
    }

    const reconstructedPath = []
    let key = `${end.i},${end.j}`

    if(!visitedParentMap.has(key)) return []

    while(key !== 'START') {
        reconstructedPath.push(key) 
        key = visitedParentMap.get(key)
    }

    return reconstructedPath.reverse()
};

const p1 = bfs(matrix, {i: 0, j: 0}, {i:70, j:70}).length - 1
console.log(p1)

const p2Matrix = Array.from({length: 71}, () => Array.from({length: 71}, () => '.'))

for(const byte of input) {
    p2Matrix[byte.j][byte.i] = "#";

    if(!bfs(p2Matrix, {i: 0, j:0}, {i: 70, j: 70}).length) {
        console.log(byte)
        break
    }
}
