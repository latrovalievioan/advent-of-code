import * as fs from "fs";

const input = fs
    .readFileSync("./input", "utf-8")
    .split("\n\n")
    .map((m) => {
        const machines = m
            .split("\n")
            .filter(Boolean)
            .map((l) => {
                if (l.match("Button A")) {
                    const deltas = l
                        .replace("Button A: X+", "")
                        .replace(" Y+", "")
                        .split(",")
                        .map(Number);

                    return { dX: deltas[0], dY: deltas[1] };
                }

                if (l.match("Button B")) {
                    const deltas = l
                        .replace("Button B: X+", "")
                        .replace(" Y+", "")
                        .split(",")
                        .map(Number);

                    return { dX: deltas[0], dY: deltas[1] };
                }

                const locations = l
                    .replace("Prize: X=", "")
                    .replace(" Y=", "")
                    .split(",")
                    .map(Number);

                return { x: locations[0], y: locations[1] };
            });

        return {button1: machines[0], button2: machines[1], location: machines[2]}
    });

const solveMachine = (machine: (typeof input[number])) => {
    const M = [
    [machine.button1.dX, machine.button2.dX],
    [machine.button1.dY, machine.button2.dY]
    ]

    const determinantM = (M[0][0] * M[1][1]) - (M[0][1] * M[1][0])

    const button1M = [
        [machine.location.x, machine.button2.dX],
        [machine.location.y, machine.button2.dY]
    ]

    const determinantButton1M = (button1M[0][0] * button1M[1][1]) - (button1M[0][1] * button1M[1][0])

    const button2M = [
        [machine.button1.dX, machine.location.x],
        [machine.button1.dY, machine.location.y]
    ]

    const determinantButton2M = (button2M[0][0] * button2M[1][1]) - (button2M[0][1] * button2M[1][0])

    const buttonAPresses = determinantButton1M / determinantM

    const buttonBPresses = determinantButton2M / determinantM

    if(buttonAPresses > 100 || buttonBPresses > 100) return 0
    if(buttonAPresses < 0 || buttonBPresses < 0) return 0
    if(!Number.isInteger(buttonAPresses) || !Number.isInteger(buttonBPresses)) return 0

    console.log(buttonAPresses, buttonBPresses)

    return Math.floor(buttonAPresses) * 3 + Math.floor(buttonBPresses)
}

const p1 = input.reduce((acc, machine) => acc += solveMachine(machine),0)

console.log(p1)
