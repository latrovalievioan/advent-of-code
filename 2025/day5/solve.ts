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
    ) as [number[][], number[]];

const p1 = xs.filter((x: number) => {
    for (let i = 0; i < ranges.length; i++) {
        const [l, r] = ranges[i]

        if (x >= l && x <= r) {
            return true;
        }
    }

    return false;
}).length;

// console.log(p1);

const p2 = (() => {
    let acc = 0

    ranges.sort((a, b) => a[0] - b[0])

    console.log(ranges)

    for (let i = 0; i < ranges.length; i++) {
        console.log(ranges[i])
        console.log('CURRENT INDEX', i)
        if (i === ranges.length - 1) {
            acc += ranges[i][1] - ranges[i][0] + 1
            continue
        }

        if (ranges[i][1] < ranges[i + 1][0]) {
            acc += ranges[i][1] - ranges[i][0] + 1
            continue
        }

        let highestR = 0
        let j = i
        while (j < ranges.length - 1 && ranges[j + 1][0] <= ranges[j][1]) {
            if (ranges[j][1] > highestR) {
                highestR = ranges[j][1]
            }

            j++
        }

        if (ranges[j][1] > highestR) {
            highestR = ranges[j][1]
        }

        acc += highestR - ranges[i][0] + 1

        console.log('    MERGED RANGES', i, j)

        i = j
    }

    return acc

})()

console.log(p2)
