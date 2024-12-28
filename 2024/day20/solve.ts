 import * as fs from 'fs'

 const matrix = fs.readFileSync('./test_input', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(l => l.split('').filter(Boolean))

 console.table(matrix)
