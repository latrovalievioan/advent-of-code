import * as fs from "fs";

const [rawRules, rawUpdates] = fs
    .readFileSync("./input", "utf-8")
    .split(/\n\s*\n/);

const rules = rawRules
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("|").map(Number));

const updates = rawUpdates
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split(",").map(Number));

const isCorrectUpdate = (update: number[]) => {
    for (let i = 0; i < rules.length; i++) {
        if (
            update.indexOf(rules[i][0]) < 0 ||
            update.indexOf(rules[i][1]) < 0
        ) {
            continue;
        }

        if (update.indexOf(rules[i][0]) > update.indexOf(rules[i][1])) {
            return false;
        }
    }

    return true;
};

const part1 = () => {
    const correctUpdates = updates.filter(isCorrectUpdate);

    return correctUpdates.reduce(
        (acc, curr) => acc + curr[Math.floor(curr.length / 2)],
        0,
    );
};

const part2 = () => {
    const incorrectUpdates = updates.filter((update) => !isCorrectUpdate(update));

    const reordered = incorrectUpdates.map((u) => {
        while(!isCorrectUpdate(u)) {
            for (let i = 0; i < rules.length; i++) {
                if (u.indexOf(rules[i][0]) < 0 || u.indexOf(rules[i][1]) < 0) {
                    continue;
                }

                if (u.indexOf(rules[i][0]) > u.indexOf(rules[i][1])) {
                    const temp = u[u.indexOf(rules[i][0])];
                    u[u.indexOf(rules[i][0])] = u[u.indexOf(rules[i][1])];
                    u[u.indexOf(rules[i][1])] = temp;
                }
            }
        }

        return u;
    });

    return reordered.reduce(
        (acc, curr) => acc + curr[Math.floor(curr.length / 2)],
        0,
    );
};

console.log(part1());

console.log(part2());
