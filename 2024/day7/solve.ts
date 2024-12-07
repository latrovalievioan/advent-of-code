import * as fs from "fs";

const lines = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
        const [test_val, nums] = l.split(": ");

        return {
            test_val: Number(test_val),
            nums: nums.split(" ").map(Number),
        };
    });

const binToOp = (n: "0" | "1") => {
    switch (n) {
        case "0":
            return "+";
        case "1":
            return "*";
    }
};

const validLines = lines.filter((l) => {
    const maxCombinations = 2 ** (l.nums.length - 1);

    for (let i = 0; i < maxCombinations; i++) {
        const currentCombination = i
            .toString(2)
            .padStart(l.nums.length - 1, "0")
            .split("") as Array<"0" | "1">

        const res = l.nums.reduce((acc, curr, i) => {
            return i === 0
                ? acc + curr
                : eval(`${acc}${binToOp(currentCombination[i - 1])}${curr}`);
        }, 0);

        if (res === l.test_val) {
            return true;
        }
    }
});

const part1 = validLines.reduce((acc, curr) => acc + curr.test_val, 0);

console.log(part1);
