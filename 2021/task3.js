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

const solvePart2 = (input) => {
  const getMostCommon = (column) => (Number(column.match(/1/g).length) >= column.match(/0/g).length)
  const getLeastCommon = (column) => (Number(column.match(/1/g).length) < column.match(/0/g).length)

  const getRating = (input, j, fn) => {
    if(input.length <= 1) {
      return input
    }
    const transposedInput = Array(input[0].length).fill('')
      .map(
        (e,i) => (input.map(e2 => (e2[i]))).join('')
      )
    const column = transposedInput[j]
    const mostCommon = fn(column)
    const fInput = input.filter((n) => {
      return Number(n[j]) === Number(mostCommon)
    })
    return getRating(fInput, j+ 1, fn)
  }
  const ogRating = getRating(input, 0, getMostCommon).join('')
  const co2Rating = getRating(input, 0, getLeastCommon).join('')
  
  return parseInt(ogRating, 2) * parseInt(co2Rating, 2)
}

console.log(solvePart2(input))






