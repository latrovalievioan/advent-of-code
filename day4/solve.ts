import * as fs from "fs";

const part1 = fs
    .readFileSync("./input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((x) =>
        x
            .replace(/Card [0-9]: /, "")
            .split("|")
            .map((s) =>
                s
                    .trim()
                    .split(" ")
                    .filter(Boolean)
                    .map((c) => Number(c)),
            ),
    )
    .map((xs) => xs[1].filter((x) => xs[0].includes(x)))
    .filter((xs) => xs.length)
    .reduce(
        (acc, curr) => curr.reduce((a, _, i) => (i === 0 ? 1 : a * 2), 0) + acc,
        0,
    );

const part2 = () => {
    const matching = fs
        .readFileSync("./input", "utf-8")
        .split("\n")
        .filter(Boolean)
        .map((x) =>
            x
                .replace(/Card [0-9]: /, "")
                .split("|")
                .map((s) =>
                    s
                        .trim()
                        .split(" ")
                        .filter(Boolean)
                        .map((c) => Number(c)),
                ),
        )
        .map((xs) => xs[1].filter((x) => xs[0].includes(x)).length);

    const arr = new Array(matching.length).fill(1);

    for (let i = 0; i < arr.length; i++) {
        for (let j = arr[i]; j > 0; j--) {
            for (let z = i + 1; z <= i + matching[i]; z++) {
                arr[z]++;
            }
        }
    }

    return arr.reduce((a, b) => a + b, 0);
};

console.log(part2());
