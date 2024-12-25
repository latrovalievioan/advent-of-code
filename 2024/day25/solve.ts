import * as fs from 'fs';

const locksAndKeys = fs.readFileSync('./input', 'utf-8')
    .split('\n\n')
    .filter(Boolean)
    .map(x => x.split('\n').filter(Boolean).map(y => y.split('')))


const locks = locksAndKeys.filter(x => x[0][0] === '#')
const keys = locksAndKeys.filter(x => x[0][0] !== '#')

// console.log('pins')
// pins.forEach(p => console.table(p))
// console.log('keys')
// keys.forEach(l => console.table(l))

const lockToHeights = (lock: string[][]) => {
    const heights = new Array(lock[0].length).fill(0)

    for(let i = 1; i < lock.length - 1; i++) {
        for(let j = 0; j < lock[0].length; j++) {
            if(lock[i][j] === '#') {
                heights[j]++
            }
        }
    }

    return heights
}

const keyToHeights = (key: string[][]) => {
    const heights = new Array(key[0].length).fill(0)

    for(let i = key.length - 2; i > 0; i--) {
        for(let j = 0; j < key[0].length; j++) {
            if(key[i][j] === '#') {
                heights[j]++
            }
        }
    }

    return heights
}

const locksHeights = locks.map(lockToHeights)

const keysHeights = keys.map(keyToHeights)


const p1 = () => {
    let acc = 0;

    const pinMaxHeight = locks[0].length - 2

    for(const lock of locksHeights) {
        for(const key of keysHeights) {
            let matches = true
            for(let i = 0; i < key.length; i++) {
                console.log(key, lock, i )
                console.log(key[i], lock[i])
                const keyPinSpace = pinMaxHeight - lock[i]
                if(key[i] > keyPinSpace) {
                    matches = false
                    break
                }
            }

            acc += Number(matches)
        }
    }

    return acc
}

console.log(p1())
