import * as fs from "fs";

const input = fs.readFileSync("./input", "utf-8").split("\n\n");

const mapStarters = input[0].split("\n").map((s) => s.split(": "));

const valuesMap = new Map<string, number>();

mapStarters.forEach((ms) => {
    valuesMap.set(ms[0], Number(ms[1]));
});

const operations = input[1]
    .split("\n")
    .filter(Boolean)
    .map((op) => op.replace("-> ", "").split(" "))
    .map((op) => ({
        firstOperand: op[0],
        operation: op[1],
        secondOperand: op[2],
        resultKey: op[3],
    }));

const opWordToJS = (word: string) => {
    switch (word) {
        case "AND":
            return "&";
        case "OR":
            return "|";
        case "XOR":
            return "^";
    }
};

while (operations.length) {
    const op = operations.pop();

    const firstOperandValue = valuesMap.get(op.firstOperand);
    const secondOperandValue = valuesMap.get(op.secondOperand);

    if (firstOperandValue !== undefined && secondOperandValue !== undefined) {
        const result = eval(
            `${firstOperandValue} ${opWordToJS(op.operation)} ${secondOperandValue}`,
        );

        valuesMap.set(op.resultKey, result);
    } else {
        operations.unshift(op);
    }
}

const p1 = parseInt(Array.from(valuesMap.entries())
    .filter((kv) => kv[0].startsWith("z"))
    .sort((kvA, kvB) => kvA[0].localeCompare(kvB[0]))
    .reverse()
    .reduce((acc, curr) => acc + curr[1],''), 2)

console.log(p1);

const xs = Array.from(valuesMap.entries())
    .filter((kv) => kv[0].startsWith("x"))
    .sort((kvA, kvB) => kvA[0].localeCompare(kvB[0]))

const ys = Array.from(valuesMap.entries())
    .filter((kv) => kv[0].startsWith("y"))
    .sort((kvA, kvB) => kvA[0].localeCompare(kvB[0]))

const zs = Array.from(valuesMap.entries())
    .filter((kv) => kv[0].startsWith("z"))
    .sort((kvA, kvB) => kvA[0].localeCompare(kvB[0]))

const xsYsSym = (parseInt(xs.map(x => x[1]).join(''), 2) + parseInt(ys.map(y => y[1]).join(''), 2)).toString(2)
console.log(xsYsSym)
console.log(zs.map(z => z[1]).join(''))

const operations2 = input[1]
    .split("\n")
    .filter(Boolean)
    .map((op) => op.replace("-> ", "").split(" "))
    .map((op) => ({
        firstOperand: op[0],
        operation: op[1],
        secondOperand: op[2],
        resultKey: op[3],
    }));

const xyAndOperations = Object.values(operations2)
    .filter((v) => v.operation === "AND")
    .filter(
        (v) =>
            v.firstOperand.startsWith("x") || v.secondOperand.startsWith("y"),
    ).map(v => {
        const operationResult = valuesMap.get(v.firstOperand) & valuesMap.get(v.secondOperand)

        return {...v, operationResult, resultKeyValue: valuesMap.get(v.resultKey)}
    })

//
// // console.log(zipped)
// console.log(valuesMap)

