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

const search = (matrix: string[][], i: number, j: number) => {
    // Check bounds
    if(
        !matrix[i - 1] 
        || !matrix[i - 1][j - 1]
        || !matrix[i - 1][j + 1]
        || !matrix[i + 1] 
        || !matrix[i + 1][j - 1]
        || !matrix[i + 1][j + 1]
    ) {
        return false
    }

    const leftDiag = matrix[i - 1][j - 1] + matrix[i][j] + matrix[i+1][j+1]
    const rightDiag = matrix[i - 1][j + 1] + matrix[i][j] + matrix[i+1][j-1]

    const validWords = ['MAS', 'SAM']

    return (validWords.includes(leftDiag) && validWords.includes(rightDiag))
} 

const solve = (matrix: string[][]) => {
    let result = 0

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] !== 'A') continue

            result += Number(search(matrix,i,j))
        }
    }

    return result
}

console.log(solve(matrix))
