import * as fs from "fs";

const test_input = fs
    .readFileSync("./test_input", "utf-8")
    .trim()
    .split("")
    .map(Number);

const input = fs.readFileSync("./input", "utf-8").trim().split("").map(Number);

const genFiles = (fileInput: number[]) => {
    let id = 0;
    const files: ("." | number)[] = [];

    for (let i = 0; i < fileInput.length; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < fileInput[i]; j++) {
                files.push(id);
            }
            id++;
        } else {
            for (let j = 0; j < fileInput[i]; j++) {
                files.push(".");
            }
        }
    }

    return files;
};

const compactFiles = (disk: ("." | number)[]) => {
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

    return disk;
};

const checkSum1 = compactFiles(genFiles(input)).reduce(
    (acc: number, curr, i) => (curr === "." ? acc : acc + i * curr),
    0,
);

console.log(checkSum1);


const findEmptySpaceWithLength = (disk: ("." | number)[], length: number) => {
    const diskCopy = [...disk]

    const firstSpaceIndex = diskCopy.indexOf('.')

    if(firstSpaceIndex < 0) return false

    let spaceLength = 0

    for(let i = firstSpaceIndex; disk[i] === '.'; i++) {
        spaceLength++
    }

    if(spaceLength >= length) return firstSpaceIndex

    if(spaceLength < length) {
        for(let i = firstSpaceIndex; i < spaceLength + firstSpaceIndex; i++) {
            diskCopy[i] = -1
        }

        return findEmptySpaceWithLength(diskCopy, length)
    }

}

const compactFiles2 = (disk: ("." | number)[]) => {
    let currentFileId = Math.max(...disk.filter((x) => typeof x === "number"));

    while (currentFileId >= 0) {
        const firstIndexOfCurrentFile = disk.indexOf(currentFileId)
        const currentFileLength = disk.lastIndexOf(currentFileId) - firstIndexOfCurrentFile + 1

        const emptySpaceWithLengthFirstIndex = findEmptySpaceWithLength(disk, currentFileLength)

        if(!emptySpaceWithLengthFirstIndex || emptySpaceWithLengthFirstIndex > firstIndexOfCurrentFile) {
            currentFileId--
            continue
        }

        for(let i = 0; i < currentFileLength; i++) {
            disk[emptySpaceWithLengthFirstIndex + i] = disk[firstIndexOfCurrentFile + i]
            disk[firstIndexOfCurrentFile + i] = '.'
            continue
        }
        currentFileId--
    }

    return disk
};

const checkSum2 = compactFiles2(genFiles(input)).reduce(
    (acc: number, curr, i) => (curr === "." ? acc : acc + i * curr),
    0,
);

console.log(checkSum2);
