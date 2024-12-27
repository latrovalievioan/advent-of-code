import * as fs from 'fs'

const connections = fs.readFileSync('./input', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(x => x.split('-'))

// console.log(connections)

const connectionsMap = new Map<string, string[]>()

for(const c of connections) {
    if(connectionsMap.get(c[0])) {
        connectionsMap.get(c[0]).push(c[1])
    } else {
        connectionsMap.set(c[0], [c[1]])
    }

    if(connectionsMap.get(c[1])) {
        connectionsMap.get(c[1]).push(c[0])
    } else {
        connectionsMap.set(c[1], [c[0]])
    }
}

// console.log(connectionsMap)

const connectionsMapKeys = Array.from(connectionsMap.keys())

const threeWayConnections = new Set<string>()

for(let x = 0; x < connectionsMapKeys.length; x++) {
    const current = connectionsMap.get(connectionsMapKeys[x])

    for(let y = 0; y < current.length; y++) {
        if(current[y] === connectionsMapKeys[x]) continue

        const innerCurrent = connectionsMap.get(current[y])

        for(let z = 0;z < innerCurrent.length; z++) {
            if(innerCurrent[z] === connectionsMapKeys[x] || innerCurrent[z] === current[y]) continue

            const innerInnerCurrent  = connectionsMap.get(innerCurrent[z])

            if(innerInnerCurrent.includes(connectionsMapKeys[x])) {
                threeWayConnections.add([connectionsMapKeys[x], current[y], innerCurrent[z]].sort().join())
            }
        }
    }
}

const p1 = Array.from(threeWayConnections).filter(c => c.split(',').filter(x => x.startsWith('t')).length).length

console.log(p1)
