import * as fs from "fs";

const solution1 = fs
    .readFileSync("./01", "utf8")
    .split("\n")
    .filter(Boolean)
    .reduce(
        (acc, curr) => {
            const [dir, ...count] = curr;

            if (dir === "L") {
                const newVal = (acc.value + 100 - Number(count.join(""))) % 100;
                return {
                    value: newVal,
                    zero_count:
                        newVal === 0 ? acc.zero_count + 1 : acc.zero_count,
                };
            }

            const newVal = (acc.value + Number(count.join(""))) % 100;
            return {
                value: newVal,
                zero_count: newVal === 0 ? acc.zero_count + 1 : acc.zero_count,
            };
        },
        { value: 50, zero_count: 0 },
    ).zero_count;

// console.log(solution1);

const solution2 = fs
    .readFileSync("./01", "utf8")
    .split("\n")
    .filter(Boolean)
    .reduce(
        (acc, curr) => {
            const [dir, ...count] = curr;

            if (dir === "L") {
                const newVal = (acc.value + 100 - Number(count.join(""))) % 100;

                let newZeroCount = acc.zero_count;
                if (acc.value < newVal) {
                    newZeroCount++;
                }

                return {
                    value: newVal,
                    zero_count: newZeroCount,
                };
            }

            const newVal = (acc.value + Number(count.join(""))) % 100;

            let newZeroCount = acc.zero_count;
            if (acc.value > newVal) {
                newZeroCount++;
            }

            return {
                value: newVal,
                zero_count: newZeroCount,
            };
        },
        { value: 50, zero_count: 0 },
    ).zero_count;

console.log(solution2);
