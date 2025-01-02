import * as fs from 'fs'

const inputs = fs.readFileSync('./input', 'utf-8')
    .split('\n')
    .filter(Boolean)

const deltaVariations = [
    {
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
    },
    {
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
        "^": {
            i: -1,
            j: 0,
        },
    },
    {
        v: {
            i: 1,
            j: 0,
        },
        "<": {
            i: 0,
            j: -1,
        },
        "^": {
            i: -1,
            j: 0,
        },
        ">": {
            i: 0,
            j: 1,
        },
    },
    {
        "<": {
            i: 0,
            j: -1,
        },
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
    },
] as const;

class Keypad {
    typedValues: string[];
    targetKeypad: string[][];
    currentPosition: { i: number; j: number };
    deltas: (typeof deltaVariations)[number];

    constructor(
        targetKeypad: string[][],
        startingPosition: { i: number; j: number },
        deltas: (typeof deltaVariations)[number],
    ) {
        this.typedValues = [];

        this.targetKeypad = targetKeypad;

        this.currentPosition = { i: startingPosition.i, j: startingPosition.j };

        this.deltas = deltas;
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

    private diffToDir(diffI: number, diffJ: number) {
        if (diffI === -1) {
            return "v";
        } else if (diffJ === 1) {
            return "<";
        } else if (diffI === 1) {
            return "^";
        } else {
            return ">";
        }
    }

    private findPath(
        currentPosition: { i: number; j: number },
        targetPosition: { i: number; j: number },
    ) {
        const visitedParentMap = new Map<
            string,
            { parent: string; cameFrom?: keyof typeof this.deltas }
        >();
        const q: { i: number; j: number }[] = [];

        q.push(currentPosition);
        visitedParentMap.set(`${currentPosition.i},${currentPosition.j}`, {
            parent: "START",
        });

        while (q.length) {
            const currentPosition = q.shift();

            const neighbours = Object.values(this.deltas)
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
                .sort((nA, nB) => {
                    const nAdir = this.diffToDir(
                        currentPosition.i - nA.i,
                        currentPosition.j - nA.j,
                    );
                    const nBdir = this.diffToDir(
                        currentPosition.i - nB.i,
                        currentPosition.j - nB.j,
                    );

                    const cameFrom = visitedParentMap.get(
                        `${currentPosition.i},${currentPosition.j}`,
                    ).cameFrom;

                    if (cameFrom) {
                        return nAdir === cameFrom
                            ? -1
                            : nBdir === cameFrom
                              ? 1
                              : 0;
                    } else return 0;
                });

            for (const neighbour of neighbours) {
                const diffI = currentPosition.i - neighbour.i;
                const diffJ = currentPosition.j - neighbour.j;

                const dir = this.diffToDir(diffI, diffJ);

                q.push(neighbour);
                visitedParentMap.set(`${neighbour.i},${neighbour.j}`, {
                    parent: `${currentPosition.i},${currentPosition.j}`,
                    cameFrom: dir,
                });
            }
        }

        let reconstructKey = `${targetPosition.i},${targetPosition.j}`;
        const dirs: string[] = [];

        while (visitedParentMap.get(reconstructKey).parent !== "START") {
            const val = visitedParentMap.get(reconstructKey);

            dirs.push(val.cameFrom);

            reconstructKey = val.parent;
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

const p1 = inputs.reduce((acc, curr) => {
    let lowest = Infinity

    for (const deltaVar of deltaVariations) {
        const x = new Keypad(
            [
                ["7", "8", "9"],
                ["4", "5", "6"],
                ["1", "2", "3"],
                [" ", "0", "A"],
            ],
            { i: 3, j: 2 },
            deltaVar,
        );

        for (const val of curr.split("").filter(Boolean)) {
            x.pressButton(val);
        }

        // console.log(x.typedValues);

        const y = new Keypad(
            [
                [" ", "^", "A"],
                ["<", "v", ">"],
            ],
            { i: 0, j: 2 },
            deltaVar,
        );

        for (const val of x.typedValues) {
            y.pressButton(val);
        }

        // console.log(y.typedValues);

        const z = new Keypad(
            [
                [" ", "^", "A"],
                ["<", "v", ">"],
            ],
            { i: 0, j: 2 },
            deltaVar,
        );

        for (const val of y.typedValues) {
            z.pressButton(val);
        }

        if(z.typedValues.length < lowest) {
            lowest = z.typedValues.length
        }
    }


    const num = Number(curr.split('').filter(x => !Number.isNaN(Number(x))).join(''))

    return acc + (num * lowest)
},0)

console.log(p1)
