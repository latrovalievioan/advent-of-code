import * as fs from 'fs'

const test_input = fs.readFileSync('./test_input', 'utf-8').trim().split(' ').map(Number)
const input = fs.readFileSync('./input', 'utf-8').trim().split(' ').map(Number)

const step = (xs: number[]) => xs.flatMap(x => {
    if(x === 0) return 1

    const stringX = x.toString(10)
    if(stringX.length % 2 === 0) {
        const mid = stringX.length / 2
        
        return [Number(stringX.slice(0, mid)), Number(stringX.slice(mid, stringX.length))]
    }

    return x * 2024
})

const p1 = (xs: number[]) => {
    for(let i = 0; i < 25; i++) {
        xs = step(xs)   
    }

    return xs.length
}


console.log(p1([0]))
