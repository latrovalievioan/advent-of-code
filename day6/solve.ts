import * as fs from "fs";

type Game = {
    time: number;
    currentBest: number;
};

const input: Game[] = (() => {
    const lines = fs
        .readFileSync("./input", "utf-8")
        .split("\n")
        .filter(Boolean)
        .map((x) => x.replace(/\s\s+/g, " "))
        .map((x) => x.replace(/Time:/, "").trim())
        .map((x) => x.replace(/Distance:/, "").trim())
        .map((x) => x.split(" ").map(Number));

    return lines[0].map((x, i) => ({ time: x, currentBest: lines[1][i] }));
})();

const getBetterDistances = (game: Game) => {
    const betterDistances: number[] = [];
    for (let hold = 0; hold <= game.time; hold++) {
        const leftMS = game.time - hold;
        const dist = leftMS * hold;

        if (dist > game.currentBest) {
            betterDistances.push(dist);
        }
    }

    return betterDistances;
};

const part1 = input
    .map((x) => getBetterDistances(x).length)
    .reduce((a, c) => a * c, 1);

console.log(part1);
