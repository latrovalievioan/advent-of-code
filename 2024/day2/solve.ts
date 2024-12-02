import * as fs from "fs";

const checkIncreaseing = (xs: number[]) => {
    let prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
        const curr = xs[i];

        if (prev > curr || prev < curr - 3 || prev === curr) return false;

        prev = curr;
    }
    return true;
};

const checkDecreasing = (xs: number[]) => {
    let prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
        const curr = xs[i];

        if (prev < curr || prev > curr + 3 || prev === curr) return false;

        prev = curr;
    }
    return true;
};

const part1 = () => {
    const input = fs
        .readFileSync("./input", "utf-8")
        .split("\n")
        .filter(Boolean)
        .map((x) => x.split(" ").map((x) => Number(x)));

    const result =
        input.filter(checkDecreasing).length +
        input.filter(checkIncreaseing).length;

    return result;
};

console.log(part1());

const checkIncreaseing2 = (xs: number[], failures: number) => {
    let prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
        const curr = xs[i];

        if (prev > curr || prev < curr - 3 || prev === curr) {
            if (failures >= 1) return false;

            const ys = [...xs];
            const zs = [...xs]

            ys.splice(i, 1);
            zs.splice(i - 1, 1);

            return checkIncreaseing2(ys, failures + 1) || checkIncreaseing2(zs,failures + 1);
        }

        prev = curr;
    }
    return true;
};

const checkDecreasing2 = (xs: number[], failures: number) => {
    let prev = xs[0];
    for (let i = 1; i <= xs.length; i++) {
        const curr = xs[i];

        if (prev < curr || prev > curr + 3 || prev === curr) {
            if (failures >= 1) return false;

            const ys = [...xs];
            const zs = [...xs]

            ys.splice(i, 1);
            zs.splice(i - 1, 1);

            return checkDecreasing2(ys, failures + 1) || checkDecreasing2(zs,failures + 1);
        }

        prev = curr;
    }
    return true;
};

const part2 = () => {
    const input = fs
        .readFileSync("./input", "utf-8")
        .split("\n")
        .filter(Boolean)
        .map((x) => x.split(" ").map((x) => Number(x)));

    return (
        input.filter((xs) => checkIncreaseing2(xs, 0)).length +
        input.filter((xs) => checkDecreasing2(xs, 0)).length
    );
};

console.log(part2());
