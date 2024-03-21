import * as fs from "fs";

const { seeds, ...ranges } = fs
    .readFileSync("./input", "utf-8")
    .split("\n\n")
    .map((x) => x.split("\n"))
    .reduce(
        (acc, curr, i) =>
            i === 0
                ? {
                      ...acc,
                      seeds: curr[0]
                          .replace(/seeds: /g, "")
                          .split(" ")
                          .map((c) => Number(c)),
                  }
                : {
                      ...acc,
                      [curr[0]]: curr
                          .slice(1)
                          .filter(Boolean)
                          .map((c) =>
                              c
                                  .split(" ")
                                  .filter(Boolean)
                                  .map((c) => Number(c)),
                          ),
                  },
        {},
    ) as {
    seeds: number[];
} & {
    [key: string]: number[][];
};

const translate = (val: number, ranges: number[][]) => {
    for (let i = 0; i < ranges.length; i++) {
        const [minIn, minOut, range] = ranges[i];
        const maxOut = minOut + range;

        if (val >= minOut && val < maxOut) {
            return minIn + val - minOut;
        }
    }

    return val;
};

const part1 = Math.min(
    ...seeds.map((s) => {
        for (let k in ranges) {
            s = translate(s, ranges[k]);
        }
        return s;
    }),
);

console.log(part1);
