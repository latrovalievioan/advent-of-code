const testInput = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

const _fs = require('fs');
const _path = "./task4_input.txt";
const data = _fs.readFileSync(_path, "utf8");

type NormalizedInput = {
  nums: number[];
  tables: Array<Array<number[]>>;
};
const _splitInput = (input: string): NormalizedInput => {
  const splitted = input.split(/\n\s*\n/);

  const result = {
    nums: splitted[0].replace(/\n/g, '').split(',').map(Number),
    tables: [],
  };

  for (let i = 1; i < splitted.length; i++) {
    result.tables.push(
      splitted[i]
        .split('\n')
        .map((s) =>
          s
            .split(' ')
            .filter((n) => n !== '')
            .map(Number)
        )
        .filter((t) => t.length)
    );
  }

  return result;
};

const checkTable = (table: Array<number[]>): boolean => {
  const rotatedTable = table[0].map((_, colIndex) =>
    table.map((row) => row[colIndex])
  );

  for (let i = 0; i < table.length; i++) {
    if (
      table[i].every((x) => x === table[i][0]) ||
      rotatedTable[i].every((x) => x === rotatedTable[i][0])
    )
      return true;
  }

  return false;
};

type WinnerTableAndNum = {
  table: Array<number[]>;
  num: number;
}

const getWinnerTableAndNum = (input: string): WinnerTableAndNum => {
  const normalizedInput = _splitInput(input);
  const { nums, tables } = normalizedInput;
  let winnerNum: number;

  for (let numsI = 0; numsI < nums.length; numsI++) {
    const currentNum = nums[numsI];

    for (let tablesI = 0; tablesI < tables.length; tablesI++) {
      const currTable = tables[tablesI];

      for (let rowI = 0; rowI < currTable.length; rowI++) {
        const currRow = currTable[rowI];

        for (let colI = 0; colI < currRow.length; colI++) {
          const currCell = currRow[colI];

          if (currCell === currentNum) {
            currRow[colI] = -1
            winnerNum = currentNum
          };
        }
      }
    }

    for (let j = 0; j < tables.length; j++) {
      const currTable = tables[j];
      if (checkTable(currTable)) return {
        table: currTable,
        num: winnerNum,
      };
    }
  }
};

const solveIt = (input: string): number => {
  const {table, num} = getWinnerTableAndNum(input);
  return table
    .flatMap((x) => x)
    .filter((x) => x !== -1)
    .reduce((a, c) => a + c) * num
};

console.log(solveIt(data));
