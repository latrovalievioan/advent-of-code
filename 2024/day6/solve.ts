import * as fs from "fs";

const test_input = fs
    .readFileSync("./test_input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split(""));

const input = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((r) => r.split(""));

const DIRECTIONS = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT",
};

const ORIENTATIONS = {
    "^": DIRECTIONS.UP,
    ">": DIRECTIONS.RIGHT,
    v: DIRECTIONS.DOWN,
    "<": DIRECTIONS.LEFT,
} as const;

const MOVES = {
    [DIRECTIONS.UP]: { i: -1, j: 0 },
    [DIRECTIONS.RIGHT]: { i: 0, j: 1 },
    [DIRECTIONS.DOWN]: { i: 1, j: 0 },
    [DIRECTIONS.LEFT]: { i: 0, j: -1 },
};

const OBSTACLE = "#";

const changeDir = (dir: keyof typeof DIRECTIONS) => {
    switch (dir) {
        case "UP":
            return "RIGHT";
        case "RIGHT":
            return "DOWN";
        case "DOWN":
            return "LEFT";
        case "LEFT":
            return "UP";
    }
};

const findStartingCoordinates = (matrix: string[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (Object.keys(ORIENTATIONS).includes(matrix[i][j])) {
                return {
                    i,
                    j,
                    dir: ORIENTATIONS[matrix[i][j]],
                };
            }
        }
    }
};

const isInBounds = (matrix: string[][], i: number, j: number) => {
    return matrix[i] && matrix[i][j];
};

const isObstacle = (matrix: string[][], i: number, j: number) => {
    return matrix[i][j] === "#";
};

console.table(test_input);

const move = (
    matrix: string[][],
    i: number,
    j: number,
    dir: keyof typeof DIRECTIONS,
    count: number = 0,
    visited: Set<string> = new Set(),
) => {
    if (!visited.has(`${i},${j}`)) {
        count++;
        visited.add(`${i},${j}`);
    }

    let nextI = i + MOVES[dir].i;
    let nextJ = j + MOVES[dir].j;

    if (!isInBounds(matrix, nextI, nextJ)) {
        return count;
    }

    if (isObstacle(matrix, nextI, nextJ)) {
        dir = changeDir(dir);
        nextI = i + MOVES[dir].i;
        nextJ = j + MOVES[dir].j;
    }

    if (!isInBounds(matrix, nextI, nextJ)) {
        return count;
    }

    return move(matrix, nextI, nextJ, dir, count, visited);
};

const part1 = (matrix: string[][]) => {
    const { i, j, dir } = findStartingCoordinates(matrix);

    return move(matrix, i, j, dir);
};

const move2 = (
    matrix: string[][],
    i: number,
    j: number,
    dir: keyof typeof DIRECTIONS,
    depth: number = 0
) => {
    if(depth > 100000) {
        return true
    }

    let nextI = i + MOVES[dir].i;
    let nextJ = j + MOVES[dir].j;

    if (!isInBounds(matrix, nextI, nextJ)) {
        return false
    }

    while(isObstacle(matrix, nextI, nextJ)) {
        dir = changeDir(dir);
        nextI = i + MOVES[dir].i;
        nextJ = j + MOVES[dir].j;
    }

    if (!isInBounds(matrix, nextI, nextJ)) {
        return false;
    }

    return move2(matrix, nextI, nextJ, dir, depth + 1);
};

const part2 = (matrix: string[][]) => {
    let count = 0
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            const startingCoordinates = findStartingCoordinates(matrix);

            if(startingCoordinates.i === i && startingCoordinates.j === j) continue

            if(matrix[i][j] === "#") continue

            const copyMatrix = [...matrix]

            const temp = copyMatrix[i][j]
            copyMatrix[i][j] = "#"

            if(move2(copyMatrix, startingCoordinates.i, startingCoordinates.j, startingCoordinates.dir)) {
                count++
                console.log(i,j)
            };

            copyMatrix[i][j] = temp
        }
    }

    return count
}

console.log(part1(input));
console.log(part2(input));
