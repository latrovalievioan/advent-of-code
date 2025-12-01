import * as fs from "fs";

const part1 = fs
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

console.log(part1);

const part2 = fs
    .readFileSync("./01", "utf8")
    .split("\n")
    .filter(Boolean)
    .reduce(
        (acc, curr) => {
            const [dir, ...count] = curr;

            let delta = Number(count.join(""))
            let newVal = acc.value
            let newZeroCount = acc.zero_count


            if(dir === 'R'){
                while(delta > 0) {
                    if(newVal === 99) {
                        newVal = 0
                    }else {
                        newVal++
                    }


                    delta--

                    if(newVal === 0) newZeroCount++
                }
            }

            if(dir === 'L'){
                while(delta > 0) {
                    if(newVal === 0) {
                        newVal = 99
                    }else {
                        newVal--
                    }

                    delta--

                    if(newVal === 0) newZeroCount++
                }
            }

            return {value: newVal, zero_count: newZeroCount}
            
        },
        { value: 50, zero_count: 0 },
    ).zero_count;

console.log(part2);
