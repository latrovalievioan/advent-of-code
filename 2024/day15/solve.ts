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

// console.table(matrix);
// console.table(biggerMatrix);

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
    console.log(currentPosition);
    const nextI = currentPosition.i + DELTAS[dir].i;
    const nextJ = currentPosition.j + DELTAS[dir].j;

    if (
        !matrix[nextI] ||
        !matrix[nextI][nextJ] ||
        matrix[nextI][nextJ] === "#"
    ) {
        return;
    }

    if (
        matrix[currentPosition.i][currentPosition.j] === "@" &&
        matrix[nextI][nextJ] === "]"
    ) {
        let depthI = currentPosition.i;
        let depthSize = 0

        if (dir === "^") {
            while (["[", "]"].includes(matrix[depthI - 1][currentPosition.j])) {
                depthI--;
                depthSize++;
            }

            for (
                let j = currentPosition.j - depthSize;
                j < currentPosition.j + depthSize - 1;
                j++
            ) {
                if (matrix[depthI - 1][j] === "#") {
                    console.log(depthI - 1, j)
                    console.log("^, ]");
                    return
                }
            }
        }

        if (dir === "v") {
            while (["[", "]"].includes(matrix[depthI - 1][currentPosition.j])) {
                depthI++;
                depthSize++;
            }

            for (
                let j = currentPosition.j - depthSize;
                j < currentPosition.j + depthSize - 1;
                j++
            ) {
                if (matrix[depthI + 1][j] === "#") {
                    console.log("v, ]");
                    return
                }
            }
        }
    }

    if (
        matrix[currentPosition.i][currentPosition.j] === "@" &&
        matrix[nextI][nextJ] === "["
    ) {
        let depthI = currentPosition.i;
        let depthSize = 0

        if (dir === "^") {
            while (["[", "]"].includes(matrix[depthI - 1][currentPosition.j])) {
                depthI--;
                depthSize++;
            }

            for (
                let j = currentPosition.j - depthSize + 1;
                j < currentPosition.j + depthSize;
                j++
            ) {
                if (matrix[depthI - 1][j] === "#") {
                    console.log("^, [");
                    return;
                }
            }
        }

        if (dir === "v") {
            while (["[", "]"].includes(matrix[depthI - 1][currentPosition.j])) {
                depthI++;
                depthSize++;
            }

            for (
                let j = currentPosition.j - depthSize + 1;
                j < currentPosition.j + depthSize;
                j++
            ) {
                if (matrix[depthI + 1][j] === "#") {
                    console.log("v, [");
                    return;
                }
            }
        }
    }

    if (
        matrix[currentPosition.i][currentPosition.j] === "@" &&
        matrix[nextI][nextJ] !== "."
    ) {
        attemptMove({ matrix, dir, currentPosition: { i: nextI, j: nextJ } });
    }

    if (dir === "<" || dir === ">") {
        if (matrix[nextI][nextJ] === "[" || matrix[nextI][nextJ] === "]") {
            attemptMove({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ },
            });
        }

        if (matrix[nextI][nextJ] === ".") {
            const temp = matrix[nextI][nextJ];
            matrix[nextI][nextJ] = matrix[currentPosition.i][currentPosition.j];
            matrix[currentPosition.i][currentPosition.j] = temp;

            return;
        }

        return;
    }

    if (
        matrix[nextI][nextJ] === "." &&
        matrix[currentPosition.i][currentPosition.j] === "@"
    ) {
        const temp = matrix[nextI][nextJ];
        matrix[nextI][nextJ] = matrix[currentPosition.i][currentPosition.j];
        matrix[currentPosition.i][currentPosition.j] = temp;

        return;
    }

    if (matrix[currentPosition.i][currentPosition.j] === "[") {
        const secondBlockJ = currentPosition.j + 1;

        if (matrix[nextI][nextJ] === "#" || matrix[nextI][secondBlockJ] === "#")
            return;

        if (matrix[nextI][nextJ] === "[" || matrix[nextI][nextJ] === "]") {
            attemptMove({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ },
            });
        }

        if (
            matrix[nextI][nextJ + 1] === "[" ||
            matrix[nextI][nextJ + 1] === "]"
        ) {
            attemptMove({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ + 1 },
            });
        }

        if (
            matrix[nextI][nextJ] === "." &&
            matrix[nextI][secondBlockJ] === "."
        ) {
            const temp = matrix[nextI][nextJ];
            matrix[nextI][nextJ] = matrix[currentPosition.i][currentPosition.j];
            matrix[currentPosition.i][currentPosition.j] = temp;

            const secondBlockTemp = matrix[nextI][secondBlockJ];
            matrix[nextI][secondBlockJ] =
                matrix[currentPosition.i][secondBlockJ];
            matrix[currentPosition.i][secondBlockJ] = secondBlockTemp;

            return;
        }

        return;
    }

    if (matrix[currentPosition.i][currentPosition.j] === "]") {
        const secondBlockJ = currentPosition.j - 1;

        if (matrix[nextI][nextJ] === "#" || matrix[nextI][secondBlockJ] === "#")
            return;

        if (matrix[nextI][nextJ] === "[" || matrix[nextI][nextJ] === "]") {
            attemptMove({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ },
            });
        }

        if (
            matrix[nextI][nextJ - 1] === "[" ||
            matrix[nextI][nextJ - 1] === "]"
        ) {
            attemptMove({
                matrix,
                dir,
                currentPosition: { i: nextI, j: nextJ - 1 },
            });
        }

        if (
            matrix[nextI][nextJ] === "." &&
            matrix[nextI][secondBlockJ] === "."
        ) {
            const temp = matrix[nextI][nextJ];
            matrix[nextI][nextJ] = matrix[currentPosition.i][currentPosition.j];
            matrix[currentPosition.i][currentPosition.j] = temp;

            const secondBlockTemp = matrix[nextI][secondBlockJ];
            matrix[nextI][secondBlockJ] =
                matrix[currentPosition.i][secondBlockJ];
            matrix[currentPosition.i][secondBlockJ] = secondBlockTemp;

            return;
        }

        return;
    }
};
//
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "[", "]", "#", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", "@", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
// ];
//
// console.table(testMatrix);
//
// attemptMove({ matrix: testMatrix, dir: "^", currentPosition: { i: 4, j: 3 } });
//
// console.table(testMatrix);

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

const p2 = (matrix: string[][], dirs: string[]) => {
    dirs.forEach((d: keyof typeof DELTAS, i) => {
        const robotLocation = findRobot(matrix);
        console.table(matrix);
        attemptMove({ matrix, dir: d, currentPosition: robotLocation });
        console.log(d);
    });
    console.table(matrix);

    let result = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === "[") {
                result += 100 * i + j;
            }
        }
    }

    return result;
};

console.log(p2(biggerMatrix, dirs));
