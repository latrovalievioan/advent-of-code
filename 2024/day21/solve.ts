const DELTAS = {
    "^": {
        i: -1,
        j: 0,
    },
    ">": {
        i: 0,
        j: 1,
    },
    v: {
        i: 1,
        j: 0,
    },
    "<": {
        i: 0,
        j: -1,
    },
};

class Keypad {
    typedValues: string[];
    targetKeypad: string[][];
    currentPosition: { i: number; j: number };

    constructor(
        targetKeypad: string[][],
        startingPosition: { i: number; j: number },
    ) {
        this.typedValues = [];

        this.targetKeypad = targetKeypad;

        this.currentPosition = { i: startingPosition.i, j: startingPosition.j };
    }

    private getTargetPosition(targetVal: string) {
        for (let i = 0; i < this.targetKeypad.length; i++) {
            for (let j = 0; j < this.targetKeypad[i].length; j++) {
                if (this.targetKeypad[i][j] === targetVal) {
                    return { i, j };
                }
            }
        }

        throw new Error("Cannot find target");
    }

    private findPath(
        currentPosition: { i: number; j: number },
        targetPosition: { i: number; j: number },
    ) {
        const visitedParentMap = new Map<string, string>();
        const q: { i: number; j: number }[] = [];

        q.push(currentPosition);
        visitedParentMap.set(
            `${currentPosition.i},${currentPosition.j}`,
            "START",
        );

        while (q.length) {
            const currentPosition = q.shift();

            const neighbours = Object.values(DELTAS)
                .filter(
                    (delta) =>
                        this.targetKeypad[currentPosition.i + delta.i] &&
                        this.targetKeypad[currentPosition.i + delta.i][
                            currentPosition.j + delta.j
                        ],
                )
                .map((delta) => ({
                    i: currentPosition.i + delta.i,
                    j: currentPosition.j + delta.j,
                }))
                .filter((n) => !visitedParentMap.has(`${n.i},${n.j}`))
                .filter((n) => this.targetKeypad[n.i][n.j] !== " ")
                .sort((a, b) =>);

            for (const neighbour of neighbours) {
                q.push(neighbour);
                visitedParentMap.set(
                    `${neighbour.i},${neighbour.j}`,
                    `${currentPosition.i},${currentPosition.j}`,
                );
            }
        }

        let reconstructKey = `${targetPosition.i},${targetPosition.j}`;
        const dirs: string[] = [];

        while (visitedParentMap.get(reconstructKey) !== "START") {
            const [keyI, keyJ] = reconstructKey.split(",").map(Number);
            const [parentI, parentJ] = visitedParentMap
                .get(reconstructKey)
                .split(",")
                .map(Number);

            const diffI = parentI - keyI;
            const diffJ = parentJ - keyJ;

            if (diffI === -1) {
                dirs.push("v");
            } else if (diffJ === 1) {
                dirs.push("<");
            } else if (diffI === 1) {
                dirs.push("^");
            } else {
                dirs.push(">");
            }

            reconstructKey = `${parentI},${parentJ}`;
        }

        return dirs.reverse();
    }

    pressButton(button: string) {
        const targetPosition = this.getTargetPosition(button);
        const path = this.findPath(this.currentPosition, targetPosition);

        path.forEach((d) => this.typedValues.push(d));
        this.typedValues.push("A");

        this.currentPosition = targetPosition;
    }
}

const sequence = "029A";

const x = new Keypad(
    [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        [" ", "0", "A"],
    ],
    { i: 3, j: 2 },
);

for (const val of sequence.split("").filter(Boolean)) {
    x.pressButton(val);
}

console.log(x.typedValues);

const y = new Keypad(
    [
        [" ", "^", "A"],
        ["<", "v", ">"],
    ],
    { i: 0, j: 2 },
);

for (const val of x.typedValues) {
    y.pressButton(val);
}

console.log(y.typedValues);

const z = new Keypad(
    [
        [" ", "^", "A"],
        ["<", "v", ">"],
    ],
    { i: 0, j: 2 },
);

for (const val of y.typedValues) {
    z.pressButton(val);
}

console.log(z.typedValues);
console.log(z.typedValues.length);
