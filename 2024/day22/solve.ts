import * as fs from "fs";

const secretNs = fs
    .readFileSync("./test_input", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map(Number);

console.log(secretNs);

const mix = (secretNum: number, mixVal: number) => {
    const secretNumBinArray = secretNum.toString(2).split('').reverse()
    const mixValBinArray = mixVal.toString(2).split('').reverse()

    const result = []

    for(let i = 0; i < Math.max(secretNumBinArray.length, mixValBinArray.length); i++) {

        if(secretNumBinArray[i] !== undefined && mixValBinArray[i] === undefined) {
            result.push(secretNumBinArray[i])
        } else if (secretNumBinArray[i] === undefined && mixValBinArray[i] !== undefined) {
            result.push(mixValBinArray[i])
        } else {
            result.push(parseInt(secretNumBinArray[i], 2) ^ parseInt(mixValBinArray[i]))
        }
    }

    return (parseInt(result.reverse().join(''), 2))
};

const prune = (secretNum: number) => secretNum % 16777216;

const evolve = (secretNum: number) => {
    secretNum = prune(mix(secretNum * 64, secretNum));

    secretNum = prune(mix(Math.floor(secretNum / 32), secretNum));

    secretNum = prune(mix(secretNum * 2048, secretNum));

    return secretNum;
};

const p1 = secretNs.reduce((acc, curr) => {
    for(let i = 0; i < 2000; i++) {
        curr = evolve(curr)
    }

    return acc + curr
},0)

console.log(p1)
