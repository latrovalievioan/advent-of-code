import * as fs from "fs";

const { seeds, ...mappings } = fs
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

// console.log(seeds, ranges);

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
        for (let k in mappings) {
            s = translate(s, mappings[k]);
        }
        return s;
    }),
);

// console.log(part1);

const mapTo = (out: number, lowMap: number, lowSeed: number) =>
    out - lowMap + lowSeed;

const mapSeedRange = (seed: number[], map: number[]) => {
    const [lowSeed, seedRange] = seed;
    const highSeed = lowSeed + seedRange - 1;
    const [mapping, lowMap, mapRange] = map;
    const highMap = lowMap + mapRange - 1;

    const toMap: number[][] = [];
    const toKeep: number[][] = [];

    //is outside
    if ((lowSeed < lowMap && highSeed < lowMap) || lowSeed > highMap) {
        toKeep.push([lowSeed, seedRange]);
    }

    // Is inside
    if (lowSeed >= lowMap && highSeed <= highMap) {
        toMap.push([mapping, lowMap, lowSeed, seedRange]);
    }

    // To the left
    if (lowSeed < lowMap && highSeed >= lowMap && highSeed <= highMap) {
        const leftRange = lowMap - lowSeed;
        toKeep.push([lowSeed, leftRange]);

        const inRange = seedRange - leftRange;
        toMap.push([mapping, lowMap, lowMap, inRange]);
    }

    // To the right
    if (lowSeed >= lowMap && lowSeed <= highMap && highSeed > highMap) {
        const inRange = highMap - lowSeed + 1;
        toMap.push([mapping, lowMap, lowSeed, inRange]);

        const rightMin = highMap + 1;
        const rightRange = highSeed - highMap;
        toKeep.push([rightMin, rightRange]);
    }

    // Contains
    if (lowSeed < lowMap && highSeed > highMap) {
        toMap.push([mapping, lowMap, lowMap, mapRange]);

        const leftRange = lowMap - lowSeed;
        toKeep.push([lowSeed, leftRange]);

        const rightMin = highMap + 1;
        const rightRange = highSeed - highMap;
        toKeep.push([rightMin, rightRange]);
    }

    return { toMap, toKeep };
};

const seedRangesFromInputSeeds = ((seeds: number[]) => {
    const res: number[][] = [];
    for (let i = 0; i < seeds.length; i++) {
        if (i % 2 === 0) {
            res.push([seeds[i], seeds[i + 1]]);
        }
    }
    return res;
})(seeds);

const isIntersecting = (seedRange: number[], mapping: number[][]) => {
    const [lowS, dist] = seedRange;
    const highS = lowS + dist - 1;

    for (let i = 0; i < mapping.length; i++) {
        const [_, lowM, distM] = mapping[i];
        const highM = lowM + distM - 1;

        if (
            (lowS >= lowM && lowS <= highM) ||
            (highS <= highM && highS >= lowM)
        ) {
            return true;
        }
    }

    return false;
};

const step = (seedRanges: number[][], mapping: number[][]) => {
    const toMap: number[][] = [];
    const toKeep: number[][] = [];
    for (let i = 0; i < seedRanges.length; i++) {
        const currSR = seedRanges[i];
        for (let j = 0; j < mapping.length; j++) {
            const currR = mapping[j];
            const rangesAndMappings = mapSeedRange(currSR, currR);
            toMap.push(...rangesAndMappings.toMap);
            toKeep.push(...rangesAndMappings.toKeep);
        }
    }

    const mapped = toMap.map((x) => [mapTo(x[0], x[1], x[2]), x[3]]);

    const kept = toKeep.filter((x) => !isIntersecting(x, mapping));

    return [...mapped, ...kept];
};

let s = seedRangesFromInputSeeds;
for (let k in mappings) {
    s = step(s, mappings[k]);
}

const part2 = Math.min(...s.map((s) => s[0]));

console.log(part2);

// // BRUTE FORCE FOR DEBUGGING
// const seedsFromSeedRanges = ((seeds: number[]) => {
//     const acc: number[] = [];
//     for (let i = 0; i < seeds.length; i++) {
//         if (i % 2 === 0) {
//             for (let j = 0; j < seeds[i + 1]; j++) {
//                 acc.push(seeds[i] + j);
//             }
//         }
//     }
//
//     return acc;
// })(seeds);
//
// const it = (seeds: number[], ranges: number[][]) => {
//     const acc: number[] = [];
//     for (let i = 0; i < seeds.length; i++) {
//         acc.push(translate(seeds[i], ranges));
//     }
//
//     return acc;
// };
//
// let sds = seedsFromSeedRanges;
// for (let i = 0; i < 3; i++) {
//     sds = it(sds, Object.values(ranges)[i]);
//     console.log(sds);
// }
// //
// // SINGLE DEBUG
// //
