import * as fs from "fs";

const input = fs.readFileSync("./test_input", "utf-8").split("\n\n");

const matrix = input[0].split("\n").map((l) => l.split(""));

const biggerMatrix = matrix.map((l) =>
    l.flatMap((x) => {
        switch (x) {
            case "#":
                return ["#", "#"];
            case "O":
                return ["[", "]"];
            case ".":
                return [".", "."];
            case "@":
                return ["@", "."];
        }
    }),
);

console.table(biggerMatrix);

const dirs = input[1]
    .replace("\n", "")
    .split("")
    .filter((x) => x !== "\n");

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

const canMove = ({ matrix, dir, currentPosition }: AttemptMoveArgs) => {
    const nextI = currentPosition.i + DELTAS[dir].i;
    const nextJ = currentPosition.j + DELTAS[dir].j;

    if (matrix[nextI][nextJ] === ".") return true;

    if (
        !matrix[nextI] ||
        !matrix[nextI][nextJ] ||
        matrix[nextI][nextJ] === "#"
    ) {
        return false;
    }

    if (dir === "<" || dir === ">") {
        if (matrix[nextI][nextJ] === "[" || matrix[nextI][nextJ] === "]") {
            return canMove({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ },
            });
        }
    }

    if (matrix[currentPosition.i][currentPosition.j] === "]") {
        const secondBlockJ = currentPosition.j - 1;

        return (
            canMove({ matrix, dir, currentPosition: { i: currentPosition.j, j: nextJ } }) &&
            canMove({
                matrix,
                dir,
                currentPosition: { i: currentPosition.i, j: secondBlockJ },
            })
        );
    }

    if (matrix[currentPosition.i][currentPosition.j] === "[") {
        const secondBlockJ = currentPosition.j + 1;

        return (
            canMove({ matrix, dir, currentPosition: { i: nextI, j: nextJ } }) &&
            canMove({
                matrix,
                dir,
                currentPosition: { i: currentPosition.i, j: secondBlockJ },
            })
        );
    }
};

const move = ({ matrix, dir, currentPosition }: AttemptMoveArgs) => {
    const nextI = currentPosition.i + DELTAS[dir].i;
    const nextJ = currentPosition.j + DELTAS[dir].j;

    // console.log(currentPosition)

    if (
        !matrix[nextI] ||
        !matrix[nextI][nextJ] ||
        matrix[nextI][nextJ] === "#"
    ) {
        return;
    }

    if (canMove({ matrix, dir, currentPosition })) {
        // console.log(currentPosition)
        if (
            (dir === "^" || dir === "v") &&
            (matrix[currentPosition.i][currentPosition.j] === "]" ||
                matrix[currentPosition.i][currentPosition.j] === "[")
        ) {
            const secondBlockJDelta =
                matrix[currentPosition.i][currentPosition.j] === "]" ? -1 : 1;

            const temp2 = matrix[nextI][nextJ + secondBlockJDelta];
            matrix[nextI][nextJ + secondBlockJDelta] =
                matrix[currentPosition.i][
                    currentPosition.j + secondBlockJDelta
                ];
            matrix[currentPosition.i][currentPosition.j + secondBlockJDelta] =
                temp2;
        }

        if (matrix[nextI][nextJ] === ".") {
            const temp = matrix[nextI][nextJ];
            matrix[nextI][nextJ] = matrix[currentPosition.i][currentPosition.j];
            matrix[currentPosition.i][currentPosition.j] = temp;
        }
    }

    if (canMove({ matrix, dir, currentPosition: { i: nextI, j: nextJ } })) {
        move({
            matrix,
            dir,
            currentPosition: { i: nextI, j: nextJ },
        });

        if (
            (dir === "^" || dir === "v") &&
            (matrix[currentPosition.i][currentPosition.j] === "]" ||
                matrix[currentPosition.i][currentPosition.j] === "[")
        ) {
            const secondBlockJDelta =
                matrix[currentPosition.i][currentPosition.j] === "]" ? -1 : 1;

            move({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ + secondBlockJDelta },
            });
        }
    }

};
const testMatrix = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
    ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
    ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
    ["#", ".", ".", "[", "]", ".", ".", ".", "#"],
    ["#", ".", ".", "@", ".", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

console.table(testMatrix);

move({ matrix: testMatrix, dir: "^", currentPosition: { i: 4, j: 3 } });

console.table(testMatrix);

// const p1 = (matrix: string[][], dirs: string[]) => {
//     dirs.forEach((d: keyof typeof DELTAS) => {
//         const robotLocation = findRobot(matrix);
//
//         attemptMove({ matrix, dir: d, currentPosition: robotLocation });
//     });
//
//     let result = 0;
//
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[i].length; j++) {
//             if (matrix[i][j] === "O") {
//                 result += 100 * i + j;
//             }
//         }
//     }
//
//     return result;
// };

// console.log(p1(matrix, dirs));

// const p2 = (matrix: string[][], dirs: string[]) => {
//     dirs.forEach((d: keyof typeof DELTAS, i) => {
//         const robotLocation = findRobot(matrix);
//         // console.table(matrix);
//         attemptMove({ matrix, dir: d, currentPosition: robotLocation });
//         console.log(d, i);
//     });
//     console.table(matrix);
//
//     let result = 0;
//
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[i].length; j++) {
//             if (matrix[i][j] === "[") {
//                 result += 100 * i + j;
//             }
//         }
//     }
//
//     return result;
// };
//
// console.log(p2(biggerMatrix, dirs));
