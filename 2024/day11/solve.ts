import * as fs from 'fs'

const test_input = fs.readFileSync('./test_input', 'utf-8').trim().split(' ').map(Number)
const input = fs.readFileSync('./input', 'utf-8').trim().split(' ').map(Number)

const blink = (x: number) => {
    if(x === 0) return [1]

    const stringX = x.toString(10)
    if(stringX.length % 2 === 0) {
        const mid = stringX.length / 2
        
        return [Number(stringX.slice(0, mid)), Number(stringX.slice(mid, stringX.length))]
    }

    return [x * 2024]
}


type Depth = number;
type Val = number;
type Res = number;

const m = new Map<Depth, Map<Val, Res>>()

const solve = (xs: number[], depth: number) => {
    if(depth === 0) return xs.length

    if(!m.get(depth)) {
        m.set(depth, new Map())
    }

    let acc = 0
    for(let i = 0; i < xs.length; i++){
        const currDepthMap = m.get(depth)

        if(currDepthMap.has(xs[i])) {
            acc += currDepthMap.get(xs[i])
        } else {
            currDepthMap.set(xs[i], solve(blink(xs[i]), depth - 1))

            acc += currDepthMap.get(xs[i])
        }
    }

    return acc
}

console.log(solve(input, 25))
console.log(solve(input, 75))
