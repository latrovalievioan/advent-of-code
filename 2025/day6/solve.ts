import * as fs from "fs";

const input = fs
    .readFileSync("./01", "utf8")
    .trim()
    .split("\n")
    .map((r) => r.trim().split(/\s+/g))

const p1 = (() => {
    let acc = 0

    for (let i = 0; i < input[0].length; i++) {
        const operator = input[input.length - 1][i]

        let pAcc = operator === "+" ? 0 : 1

        for (let j = 0; j < input.length - 1; j++) {
            pAcc = eval(`${input[j][i]}${operator}${pAcc}`)
        }

        acc += pAcc
    }

    return acc
})()

console.log(p1)
