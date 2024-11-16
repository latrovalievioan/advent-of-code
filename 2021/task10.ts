const fs = require("fs");
const path = "./task10_input.txt";
const input = fs.readFileSync(path, "utf8");

const splitInput = (str: string): string[] => {
  return str.split('\n').filter((x) => x !== '');
};

const solve = (str: string): void => {
  const scoreTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  const _scoreTable = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  let result = 0;
  let _result = [];

  const xs = splitInput(str);

  for (let i = 0; i < xs.length; i++) {
    const currLine = xs[i];

    const stack = [];

    const reverseClosingMap = {
      ')': '(',
      ']': '[',
      '}': '{',
      '>': '<',
    };

    const reverseOpeningMap = {
      '(': ')',
      '[': ']',
      '{': '}',
      '<': '>',
    };

    for (let j = 0; j < currLine.length; j++) {
      const currEl = currLine[j];

      if (currEl === '(' || currEl === '[' || currEl === '{' || currEl === '<')
        stack.push(currEl);
      else if (reverseClosingMap[currEl] === stack[stack.length - 1]) {
        stack.pop();
      } else {
        result += scoreTable[currEl];
        stack.length = 0;
        break;
      }
    }
    //PART 2
    _result.push(
      stack
        .reverse()
        .map((e) => reverseOpeningMap[e])
        .reduce((a, c) => {
          return a * 5 + _scoreTable[c];
        }, 0)
    );
  }

  const missingChars = _result.filter((e) => e > 0).sort((a, b) => a - b);

  const finalResult = missingChars[(missingChars.length - 1) / 2];

  console.log(finalResult);
};

solve(input);
