import * as fs from "fs";

const part1 = () => {
    const xs = []
    const ys = []

    const input = fs.readFileSync("./input").toString().replace(/\s+/g, ",").split(',');

    for(let i = 0; i < input.length - 1; i++) {
        if(i % 2 === 0) {
            xs.push(Number(input[i]))
        }else{
            ys.push(Number(input[i]))
        }
    }
        
    const sortedXs = xs.sort((a,b) => a - b)
    const sortedYs = ys.sort((a,b) => a - b)

    const distances = []

    for (let i = 0; i < sortedXs.length; i++) {
       distances[i] = Math.abs(sortedXs[i] - sortedYs[i]) 
    } 

    return distances.reduce((acc, curr) => acc + curr, 0)
};

console.log(part1());
