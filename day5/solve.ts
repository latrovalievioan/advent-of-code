import * as fs from "fs";

const input = fs
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

const rangesToMap = (ranges: number[][]) => {
    const map = new Map<string, number>();

    ranges.forEach((r) => {
        const [output, input, length] = r;

        for (let i = 0; i < length; i++) {
            map.set(`${input + i}`, output + i);
        }
    });

    return map;
};

const translate = (val: number, map: Map<string, number>) =>
    map.has(`${val}`) ? map.get(`${val}`) : val;

const { seeds, ...ranges } = input;

const part1 = Math.min(
    ...seeds.map((s) => {
        let val = s;
        for (let k in ranges) {
            val = translate(val, rangesToMap(ranges[k]));
        }
        return val;
    }),
);

console.log(part1);
