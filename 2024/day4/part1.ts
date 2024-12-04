import * as fs from "fs";

const test_matrix = fs
    .readFileSync("./test_input", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(""));

const matrix = fs
    .readFileSync("./input", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(""));

const allowedChars = ["X", "M", "A", "S"] as const;

const dirs = {
    UL: { i: -1, j: -1 },
    U: { i: -1, j: 0 },
    UR: { i: -1, j: 1 },
    R: { i: 0, j: 1 },
    DR: { i: 1, j: 1 },
    D: { i: 1, j: 0 },
    DL: { i: 1, j: -1 },
    L: { i: 0, j: -1 },
};

const search = (matrix: string[][], i: number, j:number, nextCharIndex: number, dir: keyof typeof dirs) => {
    if(!matrix[i + dirs[dir].i] || !matrix[i + dirs[dir].i][j + dirs[dir].j]) {
        return false
    }

    if(matrix[i + dirs[dir].i][j + dirs[dir].j] === allowedChars[nextCharIndex]) {
        if(nextCharIndex === allowedChars.length - 1) {
            return true
        }

        return search(matrix, i + dirs[dir].i, j + dirs[dir].j, nextCharIndex + 1, dir)
    }

    return false
};

const part1 = (matrix: string[][]) => {
    let result = 0

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] !== 'X') continue

            for(const dir of Object.keys(dirs)) {
                result+= Number(search(matrix, i, j, 1, dir as keyof typeof dirs))
            }
        }
    }

    return result
}

console.log(part1(matrix))
