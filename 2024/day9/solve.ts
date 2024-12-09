import * as fs from "fs";

const test_input = fs
    .readFileSync("./test_input", "utf-8")
    .trim()
    .split("")
    .map(Number);

const input = fs
    .readFileSync("./input", "utf-8")
    .trim()
    .split("")
    .map(Number);

const genFiles = (fileInput: number[]) => {
    let id = 0;
    const files: ('.' | number)[] = []

    for (let i = 0; i < fileInput.length; i++) {
        if (i % 2 === 0) {
            for(let j = 0; j < fileInput[i]; j++) {
                files.push(id)
            }
            id++;
        } else {
            for(let j = 0; j < fileInput[i]; j++) {
                files.push('.')
            }
        }
    }

    return files;
};


const compressFiles = (disk: ('.' | number)[]) => {
    let lastIndex = disk.length - 1;

    while (disk.indexOf(".") < lastIndex) {
        if (disk[lastIndex] === ".") {
            lastIndex--;
            continue;
        }

        const lastData = disk[lastIndex];
        disk[lastIndex] = ".";
        disk[disk.indexOf(".")] = lastData;
    }

    return disk
};

const checkSum = compressFiles(genFiles(input))
    .reduce((acc: number, curr, i) => (curr === "." ? acc : acc + i * curr), 0);

console.log(checkSum)
