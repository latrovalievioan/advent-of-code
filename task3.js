const fs = require("fs");

const path = "./task3_input.txt";
const data = fs.readFileSync(path, "utf8");

const getInputAsArray = (data) => {
  return data.split('\n')
}

const input = getInputAsArray(data);

const solvePart1 = (input) => {
  const gRate = Array(input[0].length).fill('')
  .map(
    (e,i) => (input.map(e2 => (e2[i])))
  ).map((e) => {
      const x = e.join('')
    return Number(x.match(/1/g).length > x.match(/0/g).length)
  })
  const yRate = gRate.map(x => Number(!x))

  return parseInt(gRate.join(''), 2) * parseInt(yRate.join(''), 2)
}

console.log(solvePart1(input))
