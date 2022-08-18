const tInput = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

const tInput2 = `
0,9 -> 5,9
8,0 -> 0,8
`

const _fs_ = require("fs");

const _path_ = "./task5_input.txt";
const _data_ = _fs_.readFileSync(_path_, "utf8");

const prettyPrint = (arr: Array<any[]>): void => {
  console.log(arr.map(r => r.join('')).join('\n'))
}

type ParsedInput = Array<{
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}>;

const parseInput = (input: string): ParsedInput =>
  input
    .split('\n')
    .filter(Boolean)
    .map((r) => {
      const c = r.split(' -> ');
      return {
        x1: Number(c[0].split(',')[0]),
        x2: Number(c[1].split(',')[0]),
        y1: Number(c[0].split(',')[1]),
        y2: Number(c[1].split(',')[1]),
      };
    });

type MatrixSize = {
  rows: number;
  cols: number;
};

const getMatrixSize = (parsedInput: ParsedInput): MatrixSize => {
  let highestX: number = 0;
  let highestY: number = 0;

  parsedInput.forEach((l) => {
    if (l.x1 > highestX) highestX = l.x1;
    if (l.x2 > highestX) highestX = l.x2;
    if (l.y1 > highestY) highestY = l.y1;
    if (l.y2 > highestY) highestY = l.y2;
  });

  return {
    cols: highestX,
    rows: highestY,
  };
};

type Matrix = Array<Array<0 | number>>;

const drawMatrix = (matrixSize: MatrixSize): Matrix => {
  const { rows, cols } = matrixSize;
  let matrix = [];
  for (let i = 0; i <= rows; i++) {
    matrix[i] = [];
    for (let j = 0; j <= cols; j++) {
      matrix[i][j] = 0;
    }
  }

  return matrix;
};

const drawLines = (matrix: Matrix, parsedInput: ParsedInput): Matrix => {
  const linesMatrix = [...matrix]

  for (let i = 0; i < parsedInput.length; i++) {
    const { x1, x2, y1, y2 } = parsedInput[i];

    const fromCol = x1 > x2 ? x2 : x1;
    const toCol = x1 > x2 ? x1 : x2;
    const fromRow = y1 > y2 ? y2 : y1;
    const toRow = y1 > y2 ? y1 : y2;
    if(fromCol !== toCol && fromRow !== toRow) continue

    for(let i = fromRow; i <= toRow; i++){
      for(let j = fromCol; j <= toCol; j++){
        if(linesMatrix[i][j] !== 0) linesMatrix[i][j]++
        else linesMatrix[i][j] = 1
      }
    }
  }

  return linesMatrix
};

const getPoints = (matrix: Matrix): number => {
  return matrix.flat().reduce((a,c) => {
    return c > 1
      ? a + 1
      : a
  }, 0)
}

const parsedInput = parseInput(_data_);

console.log(getPoints(drawLines(drawMatrix(getMatrixSize(parsedInput)), parsedInput)));
