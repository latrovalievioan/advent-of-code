const fs = require("fs");

const path = "./task2_input.txt";
const data = fs.readFileSync(path, "utf8");

const getInputAsArray = (data) => {
  return data.split('\n')
}

const input = getInputAsArray(data)

const solvePart1 = (input) => {
  const operators = {
    down: 'depth +',
    up: 'depth -',
    forward: 'h +',
  }
  const coordinates = input.filter((x) => x).reduce((acc, c, i, arr) => {
    const currentXs = c.split(' ')
    const prefix = operators[currentXs[0]].split(' ')[0]
    const operator = operators[currentXs[0]].split(' ')[1]
    const value = currentXs[1]
    acc[prefix] = (eval(`${acc[prefix]} ${operator} ${value}`))
    return acc
  }, {
    depth: 0,
    h: 0,
  })
  return coordinates.depth * coordinates.h
}



console.log(solvePart1(input))
