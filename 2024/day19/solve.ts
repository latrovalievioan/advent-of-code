import * as fs from 'fs'

const [rawPatterns, rawDesigns] = fs.readFileSync('./test_input', 'utf-8').split('\n\n')

const patterns = rawPatterns.split(', ').filter(Boolean)

const designs = rawDesigns.split('\n').filter(Boolean)

console.log(patterns, designs)

const isValidPattern = (patterns: string[], design: string) => {
}

