import * as fs from "fs";
import { MinHeap } from "./min_heap";

const matrix = fs
    .readFileSync("./input", "utf-8")
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
    end: Vector,
    direction: keyof typeof DELTAS = "R",
) => {
    const map = new Map<string, number>();
    const minHeap = new MinHeap<{ cost: number; nodeLocation: Vector; dir: keyof typeof DELTAS }>(
        (smallerCandidate, largerCandidate) => {
            if (smallerCandidate && largerCandidate) {
                return smallerCandidate.cost < largerCandidate.cost;
            }

            if(smallerCandidate && !largerCandidate) {
                return true
            }

            if(!smallerCandidate && largerCandidate) {
                return false
            }
        },
    );

    minHeap.push({ cost: 0, nodeLocation: start, dir: direction });

    while (minHeap.heapList.length > 1 && !map.has(`${end.i},${end.j}`)) {
        const curr = minHeap.pop();

        map.set(`${curr.nodeLocation.i},${curr.nodeLocation.j}`, curr.cost);

        const neighbours = Object.entries(DELTAS).map(n => {
            const neighbourLocation = {
                i: curr.nodeLocation.i + n[1].i,
                j: curr.nodeLocation.j + n[1].j
            }

            const cost = 1 + (curr.dir !== n[0] ? 1000 : 0) + curr.cost


            return {nodeLocation: neighbourLocation, cost, dir: n[0] as keyof typeof DELTAS}
        }).filter(n => matrix[n.nodeLocation.i][n.nodeLocation.j] !== '#').filter(n => !map.has(`${n.nodeLocation.i},${n.nodeLocation.j}`))

        for(const n of neighbours){
            minHeap.push(n)
        }
    }

    return map
};

const findStart = (matrix: string[][]) => {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 'S') return {i, j}
        }
    }
}

const findEnd = (matrix: string[][]) => {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 'E') return {i, j}
        }
    }
}

const p1 = dijkstra(matrix, findStart(matrix), findEnd(matrix)).get(`${findEnd(matrix).i},${findEnd(matrix).j}`);

console.log(p1)
