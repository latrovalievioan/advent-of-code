import * as fs from 'fs'

// const p1 = fs.readFileSync("./01", "utf8")
//     .replace(/\n/g, '')
//     .split(",")
//     .map(s => s.split('-').map(x => Number(x)))
//     .flatMap(range => {
//         const [l, r] = range
//
//         const invalidIds: number[] = []
//
//         for (let i = l; i <= r; i++) {
//             if (i.toString(10).length % 2 !== 0) continue
//
//             const toStr = i.toString(10)
//
//             if (toStr.substring(0, toStr.length / 2) === toStr.substring(toStr.length / 2, toStr.length)) {
//                 invalidIds.push(i)
//             }
//         }
//
//         return invalidIds
//     }).reduce((a, c) => a + c)
//
// console.log(p1)

const p2 = fs.readFileSync("./01", "utf8")
    .replace(/\n/g, '')
    .split(",")
    .map(s => s.split('-').map(x => Number(x)))
    .flatMap(range => {
        const [l, r] = range

        const invalidIds: number[] = []

        for (let i = l; i <= r; i++) {
            const toStr = i.toString(10)

            const mid = toStr.length / 2

            for(let j = 1; j <= mid; j++) {
                const pattern = toStr.substring(0, j)

                if(toStr.length % pattern.length !== 0) continue

                let isMatching = true

                for(let k = 0; k <= toStr.length - j; k += j) {
                    if(toStr.substring(k, k + j) !== pattern) {
                        isMatching = false
                    }      
                }

                if(isMatching) {
                    invalidIds.push(i)

                    break
                }
            }
        }

        console.log(invalidIds)

        return invalidIds
    }).reduce((a, c) => a + c, 0)

console.log(p2)
