// TS solution ran with bun led to seg fault, so i had to write it in js so i can run it with node ;)
const lines = require('fs')
  .readFileSync("./input", "utf-8")
  .split("\n")
  .filter(Boolean)
  .map(l => {
    const [test_val, nums] = l.split(": ")

    return {
      test_val: Number(test_val),
      nums: nums.split(" ").map(Number)
    }
  })

const binToOp = n => {
  switch (n) {
    case "0":
      return "+"
    case "1":
      return "*"
  }
}

const validLines2 = lines.filter(l => {
  const maxCombinations = 3 ** (l.nums.length - 1)
    console.log(maxCombinations)

  for (let i = 0; i < maxCombinations; i++) {
    const currentCombination = i
      .toString(3)
      .padStart(l.nums.length - 1, "0")
      .split("")

    const res = l.nums.reduce((acc, curr, i) => {
      const currentOperatorInTernary = currentCombination[i - 1]

      if (currentOperatorInTernary === "2") return Number(`${acc}` + `${curr}`)

      return i === 0
        ? acc + curr
        : eval(`${acc}${binToOp(currentOperatorInTernary)}${curr}`)
    }, 0)

    if (res === l.test_val) {
      return true
    }
  }
})

const part2 = validLines2.reduce((acc, curr) => acc + curr.test_val, 0)

console.log(part2)
