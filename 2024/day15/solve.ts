import * as fs from "fs";

const input = fs.readFileSync("./input", "utf-8").split("\n\n");

const matrix = input[0].split("\n").map((l) => l.split(""));

const dirs = input[1].replace("\n", "").split("").filter((x) => x !== '\n');

console.table(matrix);

console.log(dirs);

const DELTAS = {
    "^": {
        i: -1,
        j: 0,
    },
    ">": {
        i: 0,
        j: 1,
    },
    v: {
        i: 1,
        j: 0,
    },
    "<": {
        i: 0,
        j: -1,
    },
};

const findRobot = (matrix: string[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === "@") return { i, j };
        }
    }

    throw new Error("No Robot");
};

type AttemptMoveArgs = {
    matrix: string[][];
    dir: keyof typeof DELTAS;
    currentPosition: {
        i: number;
        j: number;
    };
};

const attemptMove = ({ matrix, dir, currentPosition }: AttemptMoveArgs) => {
    const nextI = currentPosition.i + DELTAS[dir].i;
    const nextJ = currentPosition.j + DELTAS[dir].j;

    if (!matrix[nextI] || !matrix[nextI][nextJ] || matrix[nextI][nextJ] === "#")
        return;

    if (matrix[nextI][nextJ] === "O") {
        attemptMove({ matrix, dir, currentPosition: { i: nextI, j: nextJ } });
    }

    if (matrix[nextI][nextJ] === ".") {
        const temp = matrix[currentPosition.i][currentPosition.j];
        matrix[currentPosition.i][currentPosition.j] = matrix[nextI][nextJ];
        matrix[nextI][nextJ] = temp;
    }
};

const p1 = (matrix: string[][], dirs: string[]) => {
    dirs.forEach((d: keyof typeof DELTAS) => {
        const robotLocation = findRobot(matrix)

        attemptMove({matrix, dir: d, currentPosition: robotLocation })
    })
    
    let result = 0

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 'O') {
                result += 100 * i + j
            }
        }
    }

    return result
}

console.log(p1(matrix, dirs))

