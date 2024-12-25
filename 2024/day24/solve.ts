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

console.log(valuesMap);

const p1 = parseInt(Array.from(valuesMap.entries())
    .filter((kv) => kv[0].startsWith("z"))
    .sort((kvA, kvB) => kvA[0].localeCompare(kvB[0]))
    .reverse()
    .reduce((acc, curr) => acc + curr[1],''), 2)

console.log(p1);
