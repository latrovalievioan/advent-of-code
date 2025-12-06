import * as fs from "fs";

const p1 = (() => {
    const input = fs
        .readFileSync("./01", "utf8")
        .trim()
        .split("\n")
        .map((r) => r.trim().split(/\s+/g));

    let acc = 0;

    for (let i = 0; i < input[0].length; i++) {
        const operator = input[input.length - 1][i];

        let pAcc = operator === "+" ? 0 : 1;

        for (let j = 0; j < input.length - 1; j++) {
            pAcc = eval(`${input[j][i]}${operator}${pAcc}`);
        }

        acc += pAcc;
    }

    return acc;
})();

const p2 = (() => {
    const input = fs
        .readFileSync("./01", "utf8")
        .trim()
        .split("\n")

    const operators = input[input.length-1].split(/\s+/g)
    let xs = ''

    for(let i = 0; i < input[0].length; i++) {
        let num = ''
        for(let j = 0; j < input.length - 1; j++) {
            num += input[j][i]
        }

        xs += num + '\n'
    }

    const ys = xs
        .split('\n')
        .map(x => x.trim())

    let acc = 0
    let tupleI = 0
    for(let i = 0; i < operators.length; i++) {
        let pAcc = operators[i] === "+" ? 0 : 1;

        while(ys[tupleI] !== '') {
            pAcc = eval(`${Number(ys[tupleI])}${operators[i]}${pAcc}`);
            tupleI++
        }

        acc += pAcc
        tupleI++
    }

    return acc
})();

console.log(p2)
