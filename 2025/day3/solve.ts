import * as fs from 'fs'

const p1 = fs.readFileSync('./01', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(x => {
        const nums = x.split('').map(n => Number(n))

        let highestUntill = nums[0]
        let highestCombo = nums[0]

        for(let i = 1; i < nums.length; i++) {
            const curr = nums[i]
            const newCombo = highestUntill.toString(10) + curr.toString(10) 

            if(Number(newCombo) > highestCombo) {
                highestCombo = Number(newCombo)
            }

            if(curr > highestUntill) {
                highestUntill = curr
            }
        }

        return highestCombo
    })
    .reduce((a, c) => a + c)

console.log(p1)
