import * as fs from "fs";

const part1 = () => {
    const input = fs.readFileSync("./input", "utf-8");

    const operations = input.match(/mul\(\d{1,3}\,\d{1,3}\)/g);

    const result = operations
        .map((op) =>
            op
                .match(/\d{1,3},\d{1,3}/g)
                .join()
                .split(",")
                .reduce((acc, curr) => acc * Number(curr), 1),
        )
        .reduce((acc, curr) => acc + curr);

    return result;
};

console.log(part1());

const part2 = () => {
    const input = fs.readFileSync("./input", "utf-8");

    const operations = input.match(
        /(mul\(\d{1,3}\,\d{1,3}\)|do\(\)|don't\(\))/g,
    );

    const onlyValidOperations: string[] = [];

    let shouldCount = true;

    for (let i = 0; i < operations.length; i++) {
        const currentOperation = operations[i];

        if (currentOperation.match(/do\(\)/)) {
            shouldCount = true;
            continue;
        }

        if (currentOperation.match(/don't\(\)/)) {
            shouldCount = false;
            continue;
        }

        if (shouldCount) {
            onlyValidOperations.push(currentOperation);
        }
    }

    const result = onlyValidOperations
        .map((op) =>
            op
                .match(/\d{1,3},\d{1,3}/g)
                .join()
                .split(",")
                .reduce((acc, curr) => acc * Number(curr), 1),
        )
        .reduce((acc, curr) => acc + curr);

    return result;
};

console.log(part2());
