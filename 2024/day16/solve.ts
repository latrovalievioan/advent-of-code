import * as fs from "fs";
import { MinHeap } from "./min_heap";

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

type Vector = {
    i: number;
    j: number;
};

const dijkstra = (
    matrix: string[][],
    start: Vector,
    direction: keyof typeof DELTAS = "R",
) => {
    const map = new Map<string, { cost: number; parentKey: string }[]>();
    const minHeap = new MinHeap<{
        cost: number;
        nodeLocation: Vector;
        dir: keyof typeof DELTAS;
        parentKey: string;
    }>((smallerCandidate, largerCandidate) => {
        if (smallerCandidate && largerCandidate) {
            return smallerCandidate.cost < largerCandidate.cost;
        }

        if (smallerCandidate && !largerCandidate) {
            return true;
        }

        if (!smallerCandidate && largerCandidate) {
            return false;
        }
    });

    minHeap.push({
        cost: 0,
        nodeLocation: start,
        dir: direction,
        parentKey: "START",
    });

    while (minHeap.heapList.length > 1) {
        const curr = minHeap.pop();

        if (map.has(`${curr.nodeLocation.i},${curr.nodeLocation.j}`)) {
            map.get(`${curr.nodeLocation.i},${curr.nodeLocation.j}`).push({
                cost: curr.cost,
                parentKey: curr.parentKey,
            });
        } else {
            map.set(`${curr.nodeLocation.i},${curr.nodeLocation.j}`, [
                { cost: curr.cost, parentKey: curr.parentKey },
            ]);
        }

        const neighbours = Object.entries(DELTAS)
            .map((n) => {
                const neighbourLocation = {
                    i: curr.nodeLocation.i + n[1].i,
                    j: curr.nodeLocation.j + n[1].j,
                };

                const cost = 1 + (curr.dir !== n[0] ? 1000 : 0) + curr.cost;

                return {
                    nodeLocation: neighbourLocation,
                    cost,
                    dir: n[0] as keyof typeof DELTAS,
                    parentKey: `${curr.nodeLocation.i},${curr.nodeLocation.j}`,
                };
            })
            .filter((n) => matrix[n.nodeLocation.i][n.nodeLocation.j] !== "#")
            .filter(
                (n) =>
                    !map.has(`${n.nodeLocation.i},${n.nodeLocation.j}`)
            );

        if(curr.nodeLocation.i === 10 && curr.nodeLocation.j === 3 ) {
            console.log(curr)
        }

        for (const n of neighbours) {
            minHeap.push(n);
        }
    }

    console.log(map.get("9,3"));
    return map;
};

const findStart = (matrix: string[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "S") return { i, j };
        }
    }
};

const findEnd = (matrix: string[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "E") return { i, j };
        }
    }
};

const p1 = dijkstra(matrix, findStart(matrix)).get(
    `${findEnd(matrix).i},${findEnd(matrix).j}`,
);

// console.log(p1);

const reconstructPaths = (
    map: ReturnType<typeof dijkstra>,
    start: Vector,
    end: Vector,
) => {
    const reconstructFromKey = `${end.i},${end.j}`;
    const q: string[] = [];
    q.push(reconstructFromKey);
    let acc = 0;

    while (q) {
        const curr = q.shift();
        if (curr === `${start.i},${start.j}`) break;

        map.get(curr);

        if (map.has(curr)) {
            const currVal = map.get(curr);

            const currValMinCost = Math.min(...currVal.map((v) => v.cost));

            const cheapest = currVal.filter((c) => c.cost === currValMinCost);

            cheapest.forEach((c) => q.push(c.parentKey));
        }

        acc++;
    }

    // console.log(acc)
};

console.log(
    reconstructPaths(
        dijkstra(matrix, findStart(matrix)),
        findStart(matrix),
        findEnd(matrix),
    ),
);
