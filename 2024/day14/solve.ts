import * as fs from "fs";

const input = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) =>
        l
            .replace("p=", "")
            .replace("v=", "")
            .split(" ")
            .map((x) => ({
                i: Number(x.split(",")[1]),
                j: Number(x.split(",")[0]),
            })),
    )
    .map((l) => ({ p: l[0], v: l[1] }));

const createMatrix = (h: number, w: number, robots: typeof input) => {
    const matrix: (typeof robots)[][] = Array.from({ length: h }, () =>
        Array.from({ length: w }, () => []),
    );

    robots.forEach((r) => {
        matrix[r.p.i][r.p.j].push(r);
    });

    return matrix;
};

const printMatrix = (matrix: ReturnType<typeof createMatrix>) => {
    console.table(matrix.map((r) => r.map((c) => c.length)));
};

type Robot = (typeof input)[number];

const move = (robot: Robot, mH: number, mW: number) => {
    const { i: pI, j: pJ } = robot.p;
    const { i: dI, j: dJ } = robot.v;

    return {
        p: {
            i: (pI + dI + mH) % mH,
            j: (pJ + dJ + mW) % mW,
        },
        v: robot.v,
    };
};

const tick = (times: number, robots: typeof input, mH: number, mW: number) => {
    for (let i = 0; i < times; i++) {
        robots = robots.map((r) => move(r, mH, mW));
    }

    return robots;
};

const part1 = (robots: typeof input, mH: number, mW: number, ticks: number) => {
    const mI = Math.floor(mH / 2);
    const mJ = Math.floor(mW / 2);

    const robotsAfterTime = tick(ticks, robots, mH, mW);

    // printMatrix(createMatrix(mH, mW, robotsAfterTime));

    return Object.values(
        robotsAfterTime.reduce(
            (acc, robot) => {
                const { i, j } = robot.p;

                if (i === mI || j === mJ) return acc;

                if (i < mI && j < mJ) return { ...acc, ul: [...acc.ul, robot] };

                if (i < mI && j > mJ) return { ...acc, ur: [...acc.ur, robot] };

                if (i > mI && j > mJ) return { ...acc, dr: [...acc.dr, robot] };

                if (i > mI && j < mJ) return { ...acc, dl: [...acc.dl, robot] };
            },
            { ul: [], ur: [], dl: [], dr: [] } satisfies {
                ul: Robot[];
                ur: Robot[];
                dl: Robot[];
                dr: Robot[];
            },
        ),
    ).reduce((acc, q: Robot[]) => acc * q.length, 1);
};

console.log(part1(input, 103, 101, 100));
