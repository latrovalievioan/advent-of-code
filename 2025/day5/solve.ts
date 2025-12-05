import * as fs from "fs";

const [ranges, xs] = fs
    .readFileSync("./01", "utf8")
    .split("\n\n")
    .map((x) =>
        x
            .split("\n")
            .filter(Boolean)
            .map((y) =>
                !y.includes("-") ? Number(y) : y.split("-").map(Number),
            ),
    );

console.log(ranges, xs);

const p1 = xs.filter((x: number) => {
    for (let i = 0; i < ranges.length; i++) {
        const [l, r] = ranges[i] as number[];

        if (x >= l && x <= r) {
            return true;
        }
    }

    return false;
}).length;

console.log(p1);
