import * as fs from "fs";

const input = fs.readFileSync("./01", "utf8").split("\n").filter(Boolean).map(r => r.split(''));

type Point = {i: number; j: number}

const dirs = {
    U: { i: -1, j: 0 },
    UR: { i: -1, j: +1 },
    R: { i: 0, j: +1 },
    DR: { i: +1, j: +1 },
    D: { i: +1, j: 0 },
    DL: { i: +1, j: -1 },
    L: { i: 0, j: -1 },
    UL: { i: -1, j: -1 },
} as const;

const checkDir = (
    position: Point,
    matrix: string[][],
    dir: keyof typeof dirs,
) => {
    const rowIndex = position.i - dirs[dir].i;
    const colIndex = position.j - dirs[dir].j;

    if (
        !matrix[rowIndex] ||
        !matrix[rowIndex][colIndex] ||
        matrix[rowIndex][colIndex] === "."
    ) {
        return false;
    }

    return true;
};

const p1 = (matrix: string[][]) => {
    let accessableRolls: Point[] = [];

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === '.') continue

            let neighbors = 0

            for(const dir of Object.keys(dirs) as (keyof typeof dirs)[]) {
                if(checkDir({i,j}, matrix, dir)) {
                    neighbors++
                }
            }

            if(neighbors < 4) accessableRolls.push({i,j})
        }
    }

    return accessableRolls.length
}

const p2 = (matrix: string[][]) => {
    let hasRemoved = true
    let removedCount = 0

    while(hasRemoved) {
        hasRemoved = false
        let accessableRolls: Point[] = [];

        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j] === '.') continue

                let neighbors = 0

                for(const dir of Object.keys(dirs) as (keyof typeof dirs)[]) {
                    if(checkDir({i,j}, matrix, dir)) {
                        neighbors++
                    }
                }

                if(neighbors < 4) accessableRolls.push({i,j})
            }
        }

        for(let i = 0; i < accessableRolls.length; i++) {
            matrix[accessableRolls[i].i][accessableRolls[i].j] = '.'
            removedCount++
            hasRemoved = true
        }
    }

    return removedCount
}
console.log(p2(input));
