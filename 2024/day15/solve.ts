import * as fs from "fs";

const input = fs.readFileSync("./test_input00", "utf-8").split("\n\n");

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
        matrix[currentPosition.i][currentPosition.j] === "[" &&
        matrix[currentPosition.i - 1][currentPosition.j] === "]" &&
        dir === "^"
    ) {
        let depthRight = 1;
        while (
            matrix[currentPosition.i - depthRight][
                currentPosition.j + depthRight + 1
            ] === "]"
        ) {
            depthRight++;
        }

        let depthLeft = 1;
        while (
            matrix[currentPosition.i - depthLeft][
                currentPosition.j - depthLeft
            ] === "["
        ) {
            depthLeft++;
        }

        let depth = Math.max(depthLeft, depthRight);

        const fromJ = currentPosition.j - depth;
        const toJ = currentPosition.j + depth - 1;

        for (let j = fromJ; j <= toJ; j++) {
            if (matrix[currentPosition.i - depth][j] === "#") return;
        }
    }

    if (
        matrix[currentPosition.i][currentPosition.j] === "]" &&
        matrix[currentPosition.i - 1][currentPosition.j] === "[" &&
        dir === "^"
    ) {
        let depthRight = 1;
        while (
            matrix[currentPosition.i - depthRight][
                currentPosition.j + depthRight
            ] === "]"
        ) {
            depthRight++;
        }

        let depthLeft = 1;
        while (
            matrix[currentPosition.i - depthLeft][
                currentPosition.j - depthLeft - 1
            ] === "["
        ) {
            depthLeft++;
        }

        let depth = Math.max(depthLeft, depthRight);

        const fromJ = currentPosition.j - depth;
        const toJ = currentPosition.j + depth - 1;

        for (let j = fromJ; j <= toJ; j++) {
            if (matrix[currentPosition.i - depth][j] === "#") return;
        }
    }

    if (
        matrix[currentPosition.i][currentPosition.j] === "[" &&
        matrix[currentPosition.i + 1][currentPosition.j] === "]" &&
        dir === "v"
    ) {
        let depthLeft = 1;
        while (
            matrix[currentPosition.i + depthLeft][currentPosition.j - depthLeft] === "["
        ) {
            depthLeft++;
        }

        let depthRight = 1;
        while (
            matrix[currentPosition.i + depthRight][currentPosition.j + depthRight] === "["
        ) {
            depthRight++;
        }

        const depth = Math.max(depthRight,depthLeft)

        const fromJ = currentPosition.j - depth + 1;
        const toJ = currentPosition.j + depth;

        for (let j = fromJ; j <= toJ; j++) {
            if (matrix[currentPosition.i + depth][j] === "#") return;
        }
    }

    if (
        matrix[currentPosition.i][currentPosition.j] === "]" &&
        matrix[currentPosition.i + 1][currentPosition.j] === "[" &&
        dir === "v"
    ) {
        let depthLeft = 1;
        while (
            matrix[currentPosition.i + depthLeft][currentPosition.j - depthLeft] === "]"
        ) {
            depthLeft++;
        }

        let depthRight = 1;
        while (
            matrix[currentPosition.i + depthRight][currentPosition.j + depthRight] === "]"
        ) {
            depthRight++;
        }

        const depth = Math.max(depthRight,depthLeft)
        console.log(depthLeft, depthRight)
        console.log(depth)

        const fromJ = currentPosition.j - depth;
        const toJ = currentPosition.j + depth - 1;

        for (let j = fromJ; j <= toJ; j++) {
            if (matrix[currentPosition.i + depth][j] === "#") return;
        }
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
//     ["#", "#", ".", ".", "@", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", "[", "]", "[", "]", "#", "#"],
//     ["#", "#", ".", ".", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
// ];
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", ".", "#", "#", "#", "#"],
//     ["#", "#", "[", "]", "[", "]", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", ".", "@", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
// ];
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", "@", ".", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#"],
// ];
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", "[", "]", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", "[", "]", "#", "#"],
//     ["#", "#", ".", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", "@", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
// ];
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", "[", "]", "#"],
//     ["#", "#", ".", "[", "]", "[", "]", "#", "#"],
//     ["#", "#", ".", ".", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", "@", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
// ];
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", "@", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", ".", "#", "#"],
//     ["#", "#", "[", "]", "[", "]", ".", "#", "#"],
//     ["#", "#", ".", ".", ".", "[", "]", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
// ];
// const testMatrix = [
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", ".", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", ".", ".", "@", ".", ".", "#", "#"],
//     ["#", "#", ".", "[", "]", ".", ".", "#", "#"],
//     ["#", "#", "[", "]", "[", "]", ".", "#", "#"],
//     ["#", "[", "]", ".", ".", ".", ".", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
// ];
const testMatrix = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", ".", ".", ".", "@", ".", "#", "#"],
    ["#", "#", ".", ".", "[", "]", ".", "#", "#"],
    ["#", "#", ".", "[", "]", "[", "]", "#", "#"],
    ["#", "#", "#", "#", ".", ".", "[", "]", "#"],
    ["#", "#", ".", ".", ".", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

console.table(testMatrix);

attemptMove({ matrix: testMatrix, dir: "v", currentPosition: { i: 1, j: 5 } });

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
