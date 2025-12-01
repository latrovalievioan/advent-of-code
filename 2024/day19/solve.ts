import * as fs from 'fs'

const [rawPatterns, rawDesigns] = fs.readFileSync('./input', 'utf-8').split('\n\n')

const patterns = rawPatterns.split(', ').filter(Boolean)

const designs = rawDesigns.split('\n').filter(Boolean)

const isValidDesign = (patterns: string[], design: string) => {
    const containedPatterns = patterns.filter(p => design.includes(p)).sort((a, b) => b.length - a.length)

    let j = design.length
    while(design.length){
        for(let i = 0; i < design.length; i++) {
            console.log(design)
            if(containedPatterns.includes(design.slice(i, design.length))) {
                design = design.slice(0 ,i)
                break
            }
        }
        j--

        if(j < 0) {
            return false
        }
    }

    return true
}

const p1 = designs.reduce((acc, curr) => acc + Number(isValidDesign(patterns, curr)),0)

console.log(p1)
